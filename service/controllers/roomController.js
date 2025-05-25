const Room = require('../models/Room');

const roomController = {
  getAllRooms: async (req, res) => {
    try {
      const rooms = await Room.findAll();
      res.json({
        success: true,
        data: rooms,
        count: rooms.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching rooms',
        error: error.message
      });
    }
  },

  getRoomById: async (req, res) => {
    try {
      const { id } = req.params;
      const room = await Room.findById(id);
      
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      res.json({
        success: true,
        data: room
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching room',
        error: error.message
      });
    }
  },

  createRoom: async (req, res) => {
    try {
      const { room_name, room_location, capacidad } = req.body;

      if (!room_name) {
        return res.status(400).json({
          success: false,
          message: 'Room name is required'
        });
      }

      const newRoom = await Room.create({ room_name, room_location, capacidad });
      
      res.status(201).json({
        success: true,
        message: 'Room created successfully',
        data: newRoom
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating room',
        error: error.message
      });
    }
  },

  updateRoom: async (req, res) => {
    try {
      const { id } = req.params;
      const { room_name, room_location, capacidad } = req.body;

      const existingRoom = await Room.findById(id);
      if (!existingRoom) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      const updatedRoom = await Room.update(id, { room_name, room_location, capacidad });
      
      res.json({
        success: true,
        message: 'Room updated successfully',
        data: updatedRoom
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating room',
        error: error.message
      });
    }
  },

  deleteRoom: async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedRoom = await Room.delete(id);
      
      if (!deletedRoom) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      res.json({
        success: true,
        message: 'Room deleted successfully',
        data: deletedRoom
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting room',
        error: error.message
      });
    }
  },

  getRoomLoans: async (req, res) => {
    try {
      const { id } = req.params;
      
      const room = await Room.findById(id);
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      const loans = await Room.getRoomLoans(id);
      
      res.json({
        success: true,
        data: {
          room: room,
          loans: loans
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching room loans',
        error: error.message
      });
    }
  },

  getAvailableRooms: async (req, res) => {
    try {
      const rooms = await Room.getAvailableRooms();
      
      res.json({
        success: true,
        data: rooms
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching available rooms',
        error: error.message
      });
    }
  }
};

module.exports = roomController;
