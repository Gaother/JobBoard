from flask import Blueprint, jsonify, make_response, request
from requests import Response
from datetime import date
from ..manager import Manager
from flask import Flask, request, jsonify, make_response, request, current_app,Blueprint
import json
import jwt
CHANGEVALUE = Blueprint("change_value", __name__)


@CHANGEVALUE.route("/change_value", methods=["POST", "OPTIONS", "HEAD"])
def change_value():
    if request.method in ("OPTIONS", "HEAD"):
        response = make_response()
        add_cors_headers(request.headers.get("origin"), response)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "*"
        return response

    form_request = request.get_json()
    token = form_request[0]
    if not token:
        return jsonify({'Alert!': 'Token is missing!'}), 401

    token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])

    man =  Manager()
    man.change_value(form_request[1], token["id"])
    response = make_response(jsonify({'message': 'Profile modify'}), 200)
    return cors(response)

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