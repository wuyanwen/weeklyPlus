/**
 * 需要登录
 */
exports.userRequired = async (ctx, next) => {
  if (!ctx.session || !ctx.session.user) {
    ctx.response.status = 403
    return (ctx.body = {
      status: 4,
      message: '用户需要登录',
      result: '用户需要登录',
    })
  }
  await next()
}
