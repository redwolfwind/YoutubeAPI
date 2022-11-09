import flask
from flask import Flask, render_template, request


app = Flask(__name__)
@app.route("/",methods = ["GET"])
def index():
    return render_template("index.html")


app.run(host = "localhost", port = 5555)
