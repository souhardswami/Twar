import os
import uuid
import re
import chromadb
from sentence_transformers import SentenceTransformer

chroma_client = chromadb.HttpClient(host="localhost", port=8000)
model = SentenceTransformer("all-MiniLM-L6-v2")
FILE_PATH = 'uploads/rag-knowledge-base'

def _read_file(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()

    text = re.sub(r'\n+', '\n', text)      
    text = re.sub(r'\s+', ' ', text)   
    text = text.strip()
    return text

def _chunk_text(text, chunk_size=30, overlap=10):
    words = text.split()
    chunks, start = [], 0

    while start < len(words):
        chunk = " ".join(words[start:start + chunk_size])
        chunks.append(chunk)
        start += chunk_size - overlap
    return chunks

def _store_embeddings(chunks, user_id, file_path):
    ids = [str(uuid.uuid4()) for _ in range(len(chunks))]
    embeddings = [model.encode(chunk) for chunk in chunks]
    metadatas = [{"file": os.path.basename(file_path)} for _ in chunks]

    # Note -> it will delete existing document and insert new.
    chroma_client.delete_collection(user_id)
    collection = chroma_client.get_or_create_collection(user_id)
    collection.add(documents=chunks, embeddings=embeddings, metadatas=metadatas, ids=ids)


def uploaded_document(document, filename, user_id):
    save_path = os.path.join(FILE_PATH, filename)
    document.save(save_path)

    text = _read_file(save_path)
    chunks = _chunk_text(text)
    if not chunks:
        raise ValueError("File is empty or too short to process")

    _store_embeddings(chunks, user_id, save_path)
    return "Document uploaded and processed successfully"

def retrieve(query, user_id):
    collection = chroma_client.get_or_create_collection(user_id)
    res = collection.query(
            query_texts=query,
            n_results=5,
        )
    result_documents = res["documents"]
    return result_documents

