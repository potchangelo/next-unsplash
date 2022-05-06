// --- Models
/**
 * @typedef {object} Photo
 * @property {number} id
 * @property {string} uid
 * @property {number} width
 * @property {number} height
 * @property {string} [description]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {User} user
 * @property {PhotoUrl} url
 * @property {Topic[]} topics
 */

/**
 * @typedef {object} PhotoUrl
 * @property {string} thumbnail
 * @property {string} small
 * @property {string} medium
 * @property {string} large
 * @property {string} original
 * @property {string} creditUser
 * @property {string} creditUserLink
 * @property {string} creditPhotoLink
 */

/**
 * @typedef {object} User
 * @property {string} uid
 * @property {string} username
 * @property {string} displayName
 * @property {string} [biography]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {UserAvatarUrl} [avatarUrl]
 */

/**
 * @typedef {object} UserAvatarUrl
 * @property {string} small
 * @property {string} medium
 * @property {string} large
 * @property {string} creditUser
 * @property {string} creditUserLink
 * @property {string} creditPhotoLink
 */

/**
 * @typedef {object} Topic
 * @property {string} uid
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {boolean} isFeatured
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {TopicCoverUrl} coverUrl
 */

/**
 * @typedef {object} TopicCoverUrl
 * @property {string} small
 * @property {string} medium
 * @property {string} large
 * @property {string} creditUser
 * @property {string} creditUserLink
 * @property {string} creditPhotoLink
 */

exports.unused = {};
