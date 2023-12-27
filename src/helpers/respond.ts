import { Response } from "express";
class Respond {
  /**
   * Error Response
   * @param {Object} res response object
   * @param {String} msg message string for error response
   * @param {Number} status status code
   */
  static error(
    res: Response,
    msg: String = "an error occured",
    status = 422,
    data?: any
  ): Response {
    return res.status(status).json({
      error: true,
      message: msg,
      data,
    });
  }

  /**
   * Success Response
   * @param {Object} res response object
   * @param {String} msg message string for success response
   * @param {Number} status status code
   */
  static success(res: Response, msg: String = "success", data?: any): Response {
    return res.status(200).json({
      error: false,
      message: msg,
      data,
    });
  }
}

export default Respond;
