[![Build Status](https://travis-ci.org/cwizard2011/inverted-index-api.svg?branch=master)](https://travis-ci.org/cwizard2011/inverted-index-api)
[![Coverage Status](https://coveralls.io/repos/github/cwizard2011/inverted-index-api/badge.svg?branch=master)](https://coveralls.io/github/cwizard2011/inverted-index-api?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/658371738003490dbeb9913c9f726c7a)](https://www.codacy.com/p/94271?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cwizard2011/inverted-index-api&amp;utm_campaign=Badge_Grade)

# INVERTED INDEX API
Elasticsearch uses a structure called an inverted index, which is designed to allow very fast full-text searches. An inverted index consists of a list of all the unique words that appear in any document, and for each word, a list of the documents in which it appears.

For example, let’s say we have two documents, each with a content field containing the following:

    The quick brown fox jumped over the lazy dog
    Quick brown foxes leap over lazy dogs in summer 

To create an inverted index, we first split the content field of each document into separate words (which we call terms, or tokens), create a sorted list of all the unique terms, and then list in which document each term appears. 

## End Point

- ```/api/create``` Use this to upload Json file and generate your index or indices for multiple file upload
- ```/api/search``` Use this to search the created indices

## Installation

- Clone this repository locally by opening your terminal and type
  ```git clone https://github.com/cwizard2011/inverted-index-api``` and press enter to clone this repo locally.
- type "npm install" to install all the dependencies in your terminal.

## How to run this API

- Create a ".env" file in the root directory of your repository and set ```PORT = < port of your choice >```
- In your terminal, type ```npm start``` to start the server
- launch the postman and create a post request, using ```localhost:(port)/api/create```, in the body section, set ```key``` to ```file``` choose ```File``` in the option and upload your JSON files, click ```SEND``` to create your indices.
- To search for already created indices 