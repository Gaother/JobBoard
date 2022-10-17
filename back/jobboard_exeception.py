class JobBoardException(Exception):

    STATUS_CODE = 500


class DatabasesInsertError(JobBoardException):

    STATUS_CODE = 500

class DatabasesInsertError(JobBoardException):

    STATUS_CODE = 500

class DatabasesConnexionError(JobBoardException):
    STATUS_CODE = 500


class DatabasesUpdateError(JobBoardException):
    STATUS_CODE = 500


class DatabasesRemoveError(JobBoardException):
    STATUS_CODE = 500


class DatabasesApplyError(JobBoardException):
    STATUS_CODE = 500

class LoginError(JobBoardException):
    STATUS_CODE = 403

class UserAlreadyIn(JobBoardException):
    STATUS_CODE = 403
