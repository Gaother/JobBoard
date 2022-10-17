from requests import Response
from ..manager import Manager
from flask import Flask, request, jsonify, make_response, request, current_app,Blueprint
import jwt
VERIFY = Blueprint("verify", __name__)


@VERIFY.route("/verify", methods=["POST", "OPTIONS", "HEAD"])
def verify():
    """route to verify token (is valid or admin)

    Returns:
        json: return if isConnected and isAdmin
    """
    isConnected = False
    isAdmin = False
    if request.method in ("OPTIONS", "HEAD"):
        response = make_response()
        add_cors_headers(request.headers.get("origin"), response)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "*"
        return response
   
    form_request = request.get_json()
    token = form_request['token']

    if not token:
        response = make_response(jsonify({'message': 'Token is misssing'}), 200)
        return cors(response)

    try:
        data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        if(data['type'] == 1):
            
            isAdmin = True;       
        elif (data['type'] == 0):
            
            isConnected = True;
        else:
            return cors(response = make_response(jsonify({'message': 'error'}), 500))
        return cors( make_response(jsonify({"isConnected" : isConnected, "isAdmin" : isAdmin}), 200) )


    except jwt.ExpiredSignatureError:
            response = make_response(jsonify({'message': 'Token expired, log in again'}), 200)
            return cors(response)
    except jwt.InvalidTokenError:
            response =  make_response(jsonify({'message': 'Invalid token. Please log in again.'}), 200)
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