/**
 * OrderBackend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { MeatPiece } from './meatPiece';
import { Category } from './category';


export interface SubCategory { 
    id?: number;
    name?: string | null;
    readonly stock?: number;
    categoryId?: number;
    category?: Category;
    readonly meatPieces?: Array<MeatPiece> | null;
}

