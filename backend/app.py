#!flask/bin/python
from flask import Flask, jsonify, request
import json
import os
import sys
import uuid
import random
import datetime
import Algorithmia
from flask_cors import CORS
from peewee import *

# setup algorithmia client
apiKey = 'simx+tauqLZulzMEtxbLsvikWtC1'
client = Algorithmia.client(apiKey)
# FLASK framework init
app = Flask(__name__)
# Add Cors ext module
CORS(app)

# SQL Lite DB for messages
messages = SqliteDatabase('data/messages.db')
lessons = SqliteDatabase('data/lessons.db')

# Peewee model for messages


class Message(Model):
    _id = CharField()
    subject = CharField()
    message = CharField()
    isActive = BooleanField()
    sentiment = CharField()
    url = CharField()
    analysis = CharField()

    class Meta:
        database = messages  # This model uses the "messages.db" database.


# create messages table is does not exist
messages.create_tables([Message])


def serializeUrls(self):
    data = {
        'id': self._id,
        'url': self.url,
        'analysis': self.analysis
    }

    return data


def serializeMsgs(self):
    data = {
        'id': self._id,
        'summary': str(self.subject).strip(),
        'detail': str(self.message).strip(),
        'sentiment': self.sentiment
    }

    return data


# MESSAGE RELATED ROUTES

# RETURN ALL MESSAGES - isActive == true
@app.route('/api/v1.0/messages', methods=['GET'])
def get_messages():
    holder = []
    if Message:
        for msg in Message.select().where(Message.isActive == True, Message.url == ""):
            holder.append(serializeMsgs(msg))
    return jsonify(holder)

# ADD MESSAGE AFTER FETCHING +/- SENTIMENT - nlp/SentimentAnalysis/1.0.4


@app.route('/api/v1.0/add_message', methods=['GET', 'POST'])
def add_message():
    content = request.get_json(silent=False)
    # CHK FOR API KEY
    if(hasattr(content, 'apiKey')) or (content['apiKey'] == 'youGotMe'):
        analysis = ""

        input = [content['url']]
        # INPUT FOR URL ALGO
        if content['url'] != '':
            algo = client.algo('web/AnalyzeURL/0.2.17')
            analysis = json.dumps(algo.pipe(input).result)

        # INPUT FOR SENTIMENT ALGO
        input2 = {"document": content['message']}
        algo2 = client.algo('nlp/SentimentAnalysis/1.0.4')
        returnVal = algo2.pipe(input2).result
        sentiment = returnVal[0]['sentiment']
        # CREATE NEW MESSAGE
        newmsg = Message.create(
            _id=uuid.uuid4(),
            subject=content['subject'],
            message=content['message'],
            isActive=True,
            url=content['url'],
            created=datetime.datetime.utcnow(),
            sentiment=sentiment,
            analysis=analysis
        )
        # SAVE TO DB
        newmsg.save()
        return jsonify({"message": "success"})
    else:
        return jsonify({"message": 'invalid Api Key!'})


# URLS WITH ML ANALYSIS AS JSON OBJ - web/AnalyzeURL/0.2.17
@app.route('/api/v1.0/urls', methods=['GET'])
def get_urls():
    holder = []
    if Message:
        for msg in Message.select().where(Message.isActive == True, Message.url != ""):
            holder.append(serializeUrls(msg))
    return jsonify(holder)


# URLS WITH ML ANALYSIS AS JSON OBJ - web/AnalyzeURL/0.2.17
@app.route('/api/v1.0/files', methods=['GET'])
def get_files():
    holder = []
    # if Message:
    #     for msg in Message.select().where(Message.isActive == True, Message.url != ""):
    #         holder.append(serializeUrls(msg))
    return jsonify(holder)


# USERS RELATED ROUTES

# CHECK USERS WITH ALGO - seeward/checkuser/0.2.0
@app.route('/api/v1.0/checkuser', methods=['GET'])
def check_user():
    # GET URL PARAM USER TO CHK
    user = request.args.get('user')
    # algo = client.algo('seeward/checkuser/0.2.0')
    # test = algo.pipe(user).result
    if user == "stephan":
        return jsonify({"success": "true"})
    else:
        return jsonify({"success": "false"})



# KICK OFF THE MAGIC
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
