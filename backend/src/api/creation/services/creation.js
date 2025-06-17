'use strict';

/**
 * creation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::creation.creation');
