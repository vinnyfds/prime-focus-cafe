import { z } from 'zod';

// Base schemas
export const BaseItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export const BaseLinkSchema = z.object({
  url: z.string().url().optional(),
  text: z.string().optional(),
});

// FAQ Schema
export const FAQItemSchema = BaseItemSchema.extend({
  question: z.string().optional(),
  answer: z.string().optional(),
  isExpanded: z.boolean().optional(),
});

export const FAQSchema = z.object({
  items: z.array(FAQItemSchema).default([]),
  title: z.string().optional(),
});

// Ingredients Schema
export const IngredientSchema = BaseItemSchema.extend({
  name: z.string().optional(),
  dosage: z.string().optional(),
  benefits: z.array(z.string()).default([]),
  studies: z.array(BaseLinkSchema).default([]),
  image: z.string().optional(),
});

export const IngredientsSchema = z.object({
  items: z.array(IngredientSchema).default([]),
  title: z.string().optional(),
  subtitle: z.string().optional(),
});

// References Schema
export const ReferenceSchema = BaseItemSchema.extend({
  authors: z.string().optional(),
  year: z.string().optional(),
  journal: z.string().optional(),
  title: z.string().optional(),
  doi: z.string().optional(),
  pdf: BaseLinkSchema.optional(),
  view: BaseLinkSchema.optional(),
});

export const ReferencesSchema = z.object({
  items: z.array(ReferenceSchema).default([]),
  title: z.string().optional(),
});

// Features Schema
export const FeatureSchema = BaseItemSchema.extend({
  icon: z.string().optional(),
  color: z.string().optional(),
  benefits: z.array(z.string()).default([]),
});

export const FeaturesSchema = z.object({
  items: z.array(FeatureSchema).default([]),
  title: z.string().optional(),
});

// Testimonials Schema
export const TestimonialSchema = BaseItemSchema.extend({
  name: z.string().optional(),
  role: z.string().optional(),
  company: z.string().optional(),
  image: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
});

export const TestimonialsSchema = z.object({
  items: z.array(TestimonialSchema).default([]),
  title: z.string().optional(),
});

// Main content schema
export const ContentSchema = z.object({
  faq: FAQSchema.optional(),
  ingredients: IngredientsSchema.optional(),
  references: ReferencesSchema.optional(),
  features: FeaturesSchema.optional(),
  testimonials: TestimonialsSchema.optional(),
});

// Type exports
export type FAQItem = z.infer<typeof FAQItemSchema>;
export type FAQ = z.infer<typeof FAQSchema>;
export type Ingredient = z.infer<typeof IngredientSchema>;
export type Ingredients = z.infer<typeof IngredientsSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;
export type References = z.infer<typeof ReferencesSchema>;
export type Feature = z.infer<typeof FeatureSchema>;
export type Features = z.infer<typeof FeaturesSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type Testimonials = z.infer<typeof TestimonialsSchema>;
export type Content = z.infer<typeof ContentSchema>;

// Safe parsing functions
export function safeParseFAQ(data: unknown): FAQ {
  try {
    return FAQSchema.parse(data);
  } catch {
    return { items: [] };
  }
}

export function safeParseIngredients(data: unknown): Ingredients {
  try {
    return IngredientsSchema.parse(data);
  } catch {
    return { items: [] };
  }
}

export function safeParseReferences(data: unknown): References {
  try {
    return ReferencesSchema.parse(data);
  } catch {
    return { items: [] };
  }
}

export function safeParseFeatures(data: unknown): Features {
  try {
    return FeaturesSchema.parse(data);
  } catch {
    return { items: [] };
  }
}

export function safeParseTestimonials(data: unknown): Testimonials {
  try {
    return TestimonialsSchema.parse(data);
  } catch {
    return { items: [] };
  }
}

export function safeParseContent(data: unknown): Content {
  try {
    return ContentSchema.parse(data);
  } catch {
    return {};
  }
}
