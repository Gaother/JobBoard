from flask import Blueprint, jsonify, make_response, request, current_app
from requests import Response
from ..manager import Manager
import jwt
REMJOB = Blueprint("remjob", __name__)


@REMJOB.route("/remjob", methods=["DELETE", "OPTIONS", "HEAD"])
def rem_job():
    """Route for remove a job with his ID

    Returns:
        Json: response code 
    """

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
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        if(data['type'] == 1):
            result = request.get_json()
            man = Manager()
            man.remove(result["type"], result["id"])
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
    """add cors header

    Args:
        response (json): response

    Returns:
        json: response with headers
    """
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