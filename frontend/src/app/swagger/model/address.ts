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
import { Customer } from './customer';


export interface Address { 
    id?: number;
    street?: string | null;
    city?: string | null;
    postCode?: number;
    country?: string | null;
    readonly customers?: Array<Customer> | null;
}

