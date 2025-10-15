#!/bin/bash

# Start Ollama in background
ollama serve &

# Wait for Ollama to be ready
sleep 5

# Pull llama2 model
ollama pull llama2

# Start Node.js server
node server.js
