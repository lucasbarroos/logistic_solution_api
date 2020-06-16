const { Router } = require('express');

const router = Router();
const ChannelController = require('../../controllers/Channel/index');

router.post('/channel', ChannelController.store);
router.put('/channel/:id', ChannelController.update);
router.get('/channel/:id', ChannelController.show);
router.get('/channels', ChannelController.index);
router.delete('/channel/:id', ChannelController.destroy);

// Logic to the video subs
router.patch('/subscribe/:id/:userId', ChannelController.subscribe);
router.patch('/subscribe_by_video/:id/:userId', ChannelController.subscribeByVideo);
router.get('/subscribe/:id/:userId', ChannelController.isSubscribedUser);
router.get('/subscribe_by_video/:id/:userId', ChannelController.isSubscribedUserByVideo);
router.get('/subscribers_quant/:id', ChannelController.getSubscribedTotal);

module.exports = router;
