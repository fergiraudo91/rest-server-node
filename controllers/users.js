const { response, request } = require('express');

const getUsers = (req = request, res = response) => {

  const query = req.query;

    res.json({
        message: 'GET API controller',
        query
    });
  }

  const postUsers =(req, res) => {

    const { body } = req;

    res.json({
        message: 'POST API -controller',
        body
    });
  }

  const deleteUsers = (req, res) => {
    res.json({
        message: 'DELETE API -controller'
    });
  }

  const putUsers = (req, res) => {
    const { id } = req.params;
    res.json({
        message: 'PUT API -controller',
        id
    });
  }

  const patchUsers = (req, res) => {
    res.json({
      message: "PATCH API -controller",
    });
  }

  module.exports = {
      getUsers,
      postUsers,
      deleteUsers,
      putUsers,
      patchUsers
  }