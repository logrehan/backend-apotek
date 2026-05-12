export const successResponse = (
  res,
  data,
  message = "Berhasil",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};