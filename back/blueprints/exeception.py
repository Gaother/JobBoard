from flask import Blueprint, jsonify, make_response

from ..jobboard_exeception import JobBoardException

ERROR = Blueprint("errors", __name__)


@ERROR.app_errorhandler(JobBoardException)
def handle_sdcardnotfound(exc: JobBoardException):
    """Error handler blueprint

    Args:
        exc (JobBoardException): import for JobBoardEception

    Returns:
        json: reponses Error
    """
    response = make_response(
        jsonify(
            {
                "subject": f"{exc.__class__.__name__}",
                "message": f"{exc}",
            }
        ),
        exc.STATUS_CODE,
    )
    response.headers["Access-Control-Allow-Origin"] = "*"

    response.headers["Access-Control-Allow-Headers"] = "*"

    return response
