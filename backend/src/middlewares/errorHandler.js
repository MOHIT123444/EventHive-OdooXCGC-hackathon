// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     error: true,
//     message: err.message || 'Server Error'
//   });
// };

// module.exports = errorHandler;

module.exports = (err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).json({success:false,message:err.message||'Server Error'});
};
