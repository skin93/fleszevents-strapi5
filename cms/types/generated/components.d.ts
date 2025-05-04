import type { Schema, Struct } from '@strapi/strapi';

export interface SharedNextEvent extends Struct.ComponentSchema {
  collectionName: 'components_shared_next_events';
  info: {
    displayName: 'NextEvent';
    icon: 'calendar';
  };
  attributes: {
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    endDate: Schema.Attribute.Date;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    description: '';
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Facebook'>;
    ogUrl: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'https://fleszevents.pl/'>;
  };
}

export interface SharedRelatedArticles extends Struct.ComponentSchema {
  collectionName: 'components_shared_related_articles';
  info: {
    displayName: 'RelatedArticles';
    icon: 'file';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'https://fleszevents.pl/'>;
    googleFollow: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    googleIndex: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    keywords: Schema.Attribute.Text & Schema.Attribute.Required;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false> &
      Schema.Attribute.Required;
    robotsFollow: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    robotsIndex: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedSmallGallery extends Struct.ComponentSchema {
  collectionName: 'components_shared_small_galleries';
  info: {
    displayName: 'SmallGallery';
    icon: 'picture';
  };
  attributes: {
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.next-event': SharedNextEvent;
      'shared.open-graph': SharedOpenGraph;
      'shared.related-articles': SharedRelatedArticles;
      'shared.seo': SharedSeo;
      'shared.small-gallery': SharedSmallGallery;
    }
  }
}
