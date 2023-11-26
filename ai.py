import g4f

from g4f.Provider import (
    ChatgptAi,
    Bing
)
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/', methods=['POST'])
def process():
    try:
        data = request.get_json()
        messages = data["messages"]

        response = g4f.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            provider=g4f.Provider.Bing,
        )

        json = {}
        json["message"] = response

        print(data)

        return jsonify(json)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run()
