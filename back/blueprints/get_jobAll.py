from flask import Blueprint, jsonify, make_response, request
from requests import Response
from ..manager import Manager
GETJOBALL = Blueprint("getjobAll", __name__)


@GETJOBALL.route("/getjobAll", methods=["POST", "OPTIONS", "HEAD"])
def get_job():
    """Route for get detail of a job

    Returns:
        json: return detail of a job 
    """
    if request.method in ("OPTIONS", "HEAD"):
        response = make_response()
        add_cors_headers(request.headers.get("origin"), response)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "*"
        return response
    man =  Manager()
    result = request.get_json()
    job = man.get_jobAll(result["id"])
    result = jsonify(job)
    add_cors_headers(request.headers.get("origin"), result)
    return result

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