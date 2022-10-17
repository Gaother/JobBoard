from requests import Response
from ..manager import Manager
from flask import Flask, request, jsonify, make_response, request, current_app,Blueprint
import jwt
UPJOB = Blueprint("upjob", __name__)


@UPJOB.route("/upjob", methods=["PUT", "OPTIONS", "HEAD"])
def up_job():
    

    if request.method in ("OPTIONS", "HEAD"):
        response = make_response()
        add_cors_headers(request.headers.get("origin"), response)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "*"
        return response
   
    token = request.headers.get('token')
    
    if not token:
        return jsonify({'Alert!': 'Token is missing!'}), 401

    try:
        result = request.get_json()
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        if(data['type'] == 1):
            man =  Manager()
            man.update(result)
            response = make_response(jsonify({'message': "It's all good man"}), 200)
            return cors( response)
        else:
            response = make_response(jsonify({'Alert': "Not admin"}), 403)
            return cors( response)
    except jwt.ExpiredSignatureError:
            response = make_response(jsonify({'message': 'Token expired, log in again'}), 403)
            return cors( response)
    except jwt.InvalidTokenError:
            response =  make_response(jsonify({'message': 'Invalid token. Please log in again.'}), 403)
            return cors( response)

def cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response


def add_cors_headers(origin: str, response: Response) -> None:
    """
    Adds CORS headers to the response.
    .. warning::
        The *response* will be modified *in place*!
    :param origin: The value of the ``Origin`` header in the request. If this
        is empty, no CORS headers will be added to the response.
    :param response: The :py:mod:`flask` response being sent back to the
        client.
    """
    if not origin:
        # CORS requests must be made with a Origin header. If we don't have
        # that, it's not a CORS request
        return
    response.headers["Access-Control-Allow-Origin"] = origin
    response.headers[
        "Access-Control-Allow-Methods"
    ] = "GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Expose-Headers"] = ",".join(
        ["X-Req-Correlation-Id", "Link"]
    )
    response.headers["Access-Control-Allow-Headers"] = ",".join(
        [
            "Accept",
            "Authorization",
            "Content-Type",
            "X-Warning-Endpoint",
        ]
    )