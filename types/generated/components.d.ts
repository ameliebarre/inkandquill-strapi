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

export interface ComponentsBookCategory extends Struct.ComponentSchema {
  collectionName: 'components_components_book_categories';
  info: {
    description: '';
    displayName: 'book-category';
  };
  attributes: {
    category: Schema.Attribute.Relation<'oneToOne', 'api::category.category'>;
  };
}

export interface ComponentsCategories extends Struct.ComponentSchema {
  collectionName: 'components_components_categories';
  info: {
    description: '';
    displayName: 'Categories';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::category.category'
    >;
  };
}

export interface LayoutCategoriesSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_categories_sections';
  info: {
    description: '';
    displayName: 'Category Section';
  };
  attributes: {
    bookcategory: Schema.Attribute.Component<'components.book-category', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'category.button': CategoryButton;
      'components.book-category': ComponentsBookCategory;
      'components.categories': ComponentsCategories;
      'layout.categories-section': LayoutCategoriesSection;
    }
  }
}
