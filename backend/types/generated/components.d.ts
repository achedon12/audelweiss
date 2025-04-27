import type { Schema, Struct } from '@strapi/strapi';

export interface IndexBanner extends Struct.ComponentSchema {
  collectionName: 'components_index_banners';
  info: {
    displayName: 'Banner';
  };
  attributes: {
    buttonRedirecting: Schema.Attribute.Component<'shared.link', false>;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    secondTitle: Schema.Attribute.Text;
    title_beginPart: Schema.Attribute.String;
    title_coloredText: Schema.Attribute.Component<'shared.multiple-text', true>;
    title_endPart: Schema.Attribute.String;
  };
}

export interface SharedContentArticle extends Struct.ComponentSchema {
  collectionName: 'components_shared_content_articles';
  info: {
    displayName: 'contentArticle';
    icon: 'archive';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    place: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedCustomTitle extends Struct.ComponentSchema {
  collectionName: 'components_shared_custom_titles';
  info: {
    description: '';
    displayName: 'CustomTitle';
  };
  attributes: {
    beginPart: Schema.Attribute.String;
    lastPart: Schema.Attribute.String;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    centerText: Schema.Attribute.Text;
    credentials: Schema.Attribute.String;
    leftColumn: Schema.Attribute.Component<'shared.link-column', false>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    mediaDescription: Schema.Attribute.Text;
    rightColumn: Schema.Attribute.Component<'shared.link-column', false>;
    socialMedias: Schema.Attribute.Component<'shared.icon-link', true>;
  };
}

export interface SharedHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_headers';
  info: {
    description: '';
    displayName: 'Navbar';
  };
  attributes: {
    iconLink: Schema.Attribute.Component<'shared.icon-link', true>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    navLink: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface SharedIconLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_icon_links';
  info: {
    description: '';
    displayName: 'iconLink';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isExternal: Schema.Attribute.Boolean;
    url: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    url: Schema.Attribute.Text;
  };
}

export interface SharedLinkColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_columns';
  info: {
    description: '';
    displayName: 'linkColumn';
  };
  attributes: {
    link: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedMultipleText extends Struct.ComponentSchema {
  collectionName: 'components_shared_multiple_texts';
  info: {
    displayName: 'MultipleText';
  };
  attributes: {
    entry: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'index.banner': IndexBanner;
      'shared.content-article': SharedContentArticle;
      'shared.custom-title': SharedCustomTitle;
      'shared.footer': SharedFooter;
      'shared.header': SharedHeader;
      'shared.icon-link': SharedIconLink;
      'shared.link': SharedLink;
      'shared.link-column': SharedLinkColumn;
      'shared.media': SharedMedia;
      'shared.multiple-text': SharedMultipleText;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
