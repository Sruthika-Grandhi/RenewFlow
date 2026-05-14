import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/authMiddleware';

export const getSubscriptions = async (req: AuthRequest, res: Response) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: req.userId },
      orderBy: { expiryDate: 'asc' },
    });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addSubscription = async (req: AuthRequest, res: Response) => {
  try {
    const { provider, expiryDate, planName, cost } = req.body;

    const subscription = await prisma.subscription.create({
      data: {
        provider,
        expiryDate: new Date(expiryDate),
        planName,
        cost: cost ? parseFloat(cost) : null,
        userId: req.userId as string,
      },
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSubscription = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const subscription = await prisma.subscription.findUnique({ where: { id } });
    if (!subscription || subscription.userId !== req.userId) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    await prisma.subscription.delete({ where: { id } });

    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
