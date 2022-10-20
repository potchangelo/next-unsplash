// --- Models
/**
 * @typedef {object} User
 * @property {string} uid
 * @property {string} username
 * @property {string} displayName
 * @property {string} [biography]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {UserAvatar} [avatar]
 * @property {Photo[]} [photos]
 */

/**
 * @typedef {object} UserAvatar
 * @property {string} small
 * @property {string} medium
 * @property {string} large
 * @property {string} creditUser
 * @property {string} creditUserLink
 * @property {string} creditPhotoLink
 */

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
 * @property {PhotoSrc} src
 * @property {Topic[]} topics
 */

/**
 * @typedef {object} PhotoSrc
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
 * @typedef {object} Topic
 * @property {string} uid
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {boolean} isFeatured
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {TopicCover} cover
 */

/**
 * @typedef {object} TopicCover
 * @property {string} small
 * @property {string} medium
 * @property {string} large
 * @property {string} creditUser
 * @property {string} creditUserLink
 * @property {string} creditPhotoLink
 */

exports.unused = {};
