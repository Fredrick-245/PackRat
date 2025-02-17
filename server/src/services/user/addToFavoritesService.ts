import User from '../../models/userModel';
import Pack from '../../models/packModel';

/**
 * Adds or removes a pack from a user's favorites list.
 * @param {string} packId - The ID of the pack.
 * @param {string} userId - The ID of the user.
 * @return {Promise<object>} The updated user object.
 */
export const addToFavoriteService = async (
  packId: string,
  userId: string,
): Promise<object> => {
  try {
    const exists = await User.find(
      { favorites: { $in: [packId] } },
      { _id: userId },
    );

    if (exists.length > 0) {
      await User.updateOne({ _id: userId }, { $pull: { favorites: packId } });
      await Pack.updateOne(
        { _id: packId },
        { $pull: { favorited_by: userId } },
      );
    } else {
      await User.updateOne({ _id: userId }, { $push: { favorites: packId } });
      await Pack.updateOne(
        { _id: packId },
        { $push: { favorited_by: userId } },
      );
    }

    const user = await User.findOne({ _id: userId }).select('-password');

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
