import type { Schema, Struct } from '@strapi/strapi';

export interface CategoryButton extends Struct.ComponentSchema {
  collectionName: 'components_category_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'category.button': CategoryButton;
    }
  }
}
