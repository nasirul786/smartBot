if (request.message?.message_id) {
  Api.deleteMessage({
    message_id: request.message?.message_id
  })
}
