const router = require('express').Router();
const Song = require('../../db/models/songs')
router.get('/:userID', async(req, res,next) => {
    try {
        const playlist = await Order.findOne({
          where: {
            userId: req.params.userID,
          },
          include: {
            model: Song,
          },
        });
        res.json(playlist);
      } catch (e) {
        next(e);
      }
});

module.exports = router;