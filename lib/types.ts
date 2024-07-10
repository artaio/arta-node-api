export type Attachment = {
    updated_at: Date;
    created_at: Date;
    id: number;
    upload_id: number;
    request_id?: (string | null) | undefined;
    shipment_id?: (string | null) | undefined;
};
export type QuoteRequest = {
    updated_at: Date;
    created_at: Date;
    id: string;
    bookable: {
        missing: string[];
        ready: boolean;
    };
    destination: {
        access_restrictions?: (("elevator_only" | "freight_elevator" | "loading_dock" | "loading_dock_low" | "low_clearance" | "non_paved" | "stairs_only" | "steep_gradient")[] | null) | undefined;
        address_line_1?: (string | null) | undefined;
        address_line_2?: (string | null) | undefined;
        address_line_3?: (string | null) | undefined;
        city?: (string | null) | undefined;
        region?: (string | null) | undefined;
        postal_code?: (string | null) | undefined;
        country: string;
        title?: (string | null) | undefined;
        contacts?: ({
            name: string;
            email_address?: (string | null) | undefined;
            phone_number?: (string | null) | undefined;
        }[] | null) | undefined;
        estimated_country?: string | undefined;
        estimated_region?: string | undefined;
        estimated_city?: string | undefined;
    };
    hosted_session_id: number | null;
    insurance: ("arta_transit_insurance" | "no_arta_insurance") | null;
    internal_reference: string | null;
    log_request_id: string;
    object_count: number | null;
    origin: {
        access_restrictions?: (("elevator_only" | "freight_elevator" | "loading_dock" | "loading_dock_low" | "low_clearance" | "non_paved" | "stairs_only" | "steep_gradient")[] | null) | undefined;
        address_line_1?: (string | null) | undefined;
        address_line_2?: (string | null) | undefined;
        address_line_3?: (string | null) | undefined;
        city?: (string | null) | undefined;
        region?: (string | null) | undefined;
        postal_code?: (string | null) | undefined;
        country: string;
        title?: (string | null) | undefined;
        contacts?: ({
            name: string;
            email_address?: (string | null) | undefined;
            phone_number?: (string | null) | undefined;
        }[] | null) | undefined;
        estimated_country?: string | undefined;
        estimated_region?: string | undefined;
        estimated_city?: string | undefined;
    };
    public_reference?: (string | null) | undefined;
    quote_types: ("parcel" | "premium" | "select" | "self_ship")[];
    shortcode: string;
    status: "cancelled" | "closed" | "disqualified" | "expired" | "in_progress" | "pending" | "quoted";
    tags?: any;
    currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    additional_services: ("assembly" | "debris_disposal" | "deinstallation" | "destination_additional_labor" | "destination_building_coi" | "destination_condition_check" | "destination_full_condition_report" | "destination_unpacking" | "double_blind_bols" | "installation" | "origin_building_coi" | "origin_condition_check" | "origin_full_condition_report" | "placement" | "signature_delivery" | "tarmac_supervision")[];
    disqualifications: {
        quote_types: ("parcel" | "premium" | "select" | "self_ship")[];
        reason?: (string | null) | undefined;
        reason_code: "cannot_be_packed" | "client_timeout_reached" | "external_service_unavailable" | "object_not_supported" | "out_of_network" | "over_size" | "over_value" | "over_volume" | "over_weight" | "requested_service_unavailable" | "too_many_items" | "under_value" | "under_volume" | "under_weight";
    }[];
    objects: {
        internal_reference?: (string | null) | undefined;
        current_packing?: (("alcohol_case" | "lay_flat_wine_box" | "blanket" | "wardrobe_box" | "cardboard_box" | "chandelier_box" | "chair_box" | "cbin_closed" | "cbin_open" | "ply_box" | "fine_art_econo_crate" | "fine_art_international_crate" | "econo_crate" | "international_econo_crate" | "furniture_crate" | "international_furniture_crate" | "parcel_crate" | "museum_crate" | "international_museum_crate" | "foam_lined_box" | "cavity_box" | "strongbox" | "double_box" | "travel_frame" | "travel_frame_art" | "travel_frame_other" | "a_frame" | "slat_crate" | "tri_wall_crate" | "lockbox" | "no_packing" | "pallet" | "international_pallet" | "portfolio" | "rug_rolled" | "shadow_box" | "slipcase" | "slipcase_glass_tape" | "poly_cardboard" | "bubble_cardboard" | "garment_bag" | "poly_only" | "dartek_only" | "bubble_only" | "cling_wrap" | "cbin_communal" | "sonotube" | "stabilizing_box" | "shipping_tube_small" | "shipping_tube_large")[] | null) | undefined;
        details?: ({
            materials?: (("stone_marble" | "precious_stones" | "fiber_synthetic" | "fabric_natural" | "taxidermy" | "carbon_fiber" | "live_animal" | "paper" | "glass" | "presious_metals" | "particleboard" | "styrofoam" | "wood" | "photo_film" | "sand" | "metal" | "plexiglass" | "aquatic_life" | "canvas" | "drywall" | "hard_plastic" | "vinyl" | "soft_plastic" | "leather" | "rubber" | "concreate" | "paint" | "electronics" | "fiber_natural" | "gas" | "fabric_synthetic" | "CITES" | "liquids" | "salts")[] | null) | undefined;
            creation_date?: (string | null) | undefined;
            creator?: (string | null) | undefined;
            notes?: (string | null) | undefined;
            title?: (string | null) | undefined;
            is_fragile?: (boolean | null) | undefined;
            is_cites?: (boolean | null) | undefined;
        } | null) | undefined;
        height: number | string;
        width: number | string;
        weight?: ((number | string) | null) | undefined;
        value: number | string;
        depth?: ((number | string) | null) | undefined;
        images?: (string[] | null) | undefined;
        public_reference?: (string | null) | undefined;
        subtype: "painting_unframed" | "painting_framed" | "painting_framed_plexi" | "painting_framed_glass" | "work_on_paper_unframed" | "work_on_paper_framed" | "work_on_paper_framed_plexi" | "work_on_paper_framed_glass" | "mixed_media_unframed" | "mixed_media_framed" | "mixed_media_framed_plexi" | "mixed_media_framed_glass" | "photograph_unframed" | "photograph_framed" | "photograph_framed_plexi" | "photograph_framed_glass" | "new_media" | "sculpture" | "pedestal" | "pedestal_case_glass" | "pedestal_case_plexi" | "ceramic" | "neon" | "tapestry" | "other_art" | "table" | "chair" | "sofa_loveseat_chaise" | "floor_lamp" | "floor_lamp_shade" | "table_lamp" | "table_lamp_shade" | "sconce" | "ottoman" | "bookcase_storage" | "nightstand" | "armoire_dresser" | "carpet_rug" | "mirror" | "chandelier" | "bedframe" | "headboard" | "desk_vanity" | "media_console" | "other_furniture" | "earrings" | "necklace" | "bracelet" | "ring" | "brooch" | "watch" | "cufflinks" | "eyeglasses" | "set" | "precious_stones" | "snuff_box_cigarette_case" | "other_jewelry" | "vase_vessel" | "bowl" | "plaque" | "object_of_vertu" | "candelabra_candlestick" | "dinnerware" | "flatware" | "glassware" | "serveware" | "porcelain_plate" | "porcelain_bowl" | "tabletop_accessory" | "clock" | "other_decorative_arts" | "stamp" | "book" | "coin" | "document_manuscript" | "toy" | "miniature_model" | "figurine_doll" | "neon_sign" | "memorabilia" | "camera_electrical" | "other_collectibles" | "wine_bottle" | "spirits_bottle" | "beer_bottle" | "wine_case" | "spirits_case" | "beer_case" | "wine_barrel" | "spirits_barrel" | "beer_barrel" | "other_alcohols" | "car" | "motorcycle" | "bus" | "van" | "limousine" | "carriage" | "trailer" | "sidecar" | "other_automotive" | "clothing" | "footwear" | "handbag" | "accessories" | "other_fashion" | "musical_instrument" | "firearm_weapon" | "hunting_fishing" | "medical_equipment" | "other";
        unit_of_measurement?: (string | null) | undefined;
        weight_unit?: (string | null) | undefined;
        value_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    }[];
    payment_process: "checkout" | "checkout_direct" | "invoicing";
    preferred_quote_types?: (("parcel" | "premium" | "select" | "self_ship")[] | null) | undefined;
    shipping_notes?: (string | null) | undefined;
    quotes: {
        id: number;
        included_services: {
            amount: number;
            amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
            is_requested?: boolean | undefined;
            is_required?: boolean | undefined;
            name: string;
            sub_subtype: string;
            subtype: "specialized" | "consolidated" | "freight" | "parcel" | "collection" | "delivery" | "location" | "unpacking" | "condition" | "installation" | "deinstallation" | "debris_disposal" | "site_visit" | "handling" | "packing" | "packing_materials" | "receive_release" | "warehouse" | "customs" | "coi" | "administration" | "taxes_duties" | "fees" | "security" | "equipment";
            type: "transport" | "location" | "handling" | "packing" | "storage" | "administration" | "taxes_duties_fees" | "security" | "equipment";
            included_services: any[];
        }[];
        included_insurance_policy?: ({
            amount: number;
            amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
            id: string;
            insured_value: number;
            insured_value_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
        } | null) | undefined;
        optional_services: {
            amount: number;
            amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
            is_requested?: boolean | undefined;
            is_required?: boolean | undefined;
            name: string;
            sub_subtype: string;
            subtype: "specialized" | "consolidated" | "freight" | "parcel" | "collection" | "delivery" | "location" | "unpacking" | "condition" | "installation" | "deinstallation" | "debris_disposal" | "site_visit" | "handling" | "packing" | "packing_materials" | "receive_release" | "warehouse" | "customs" | "coi" | "administration" | "taxes_duties" | "fees" | "security" | "equipment";
            type: "transport" | "location" | "handling" | "packing" | "storage" | "administration" | "taxes_duties_fees" | "security" | "equipment";
            included_services: any[];
        }[];
        quote_type: "parcel" | "premium" | "select" | "self_ship";
        status: string;
        total: number;
        total_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    }[];
};
export type Key = {
    updated_at: Date;
    created_at: Date;
    id: number;
    name: string | null;
    is_testing: boolean;
    token: string;
};
export type Shipment = {
    updated_at: Date;
    created_at: Date;
    id: string;
    destination: {
        access_restrictions?: (("elevator_only" | "freight_elevator" | "loading_dock" | "loading_dock_low" | "low_clearance" | "non_paved" | "stairs_only" | "steep_gradient")[] | null) | undefined;
        address_line_1?: (string | null) | undefined;
        address_line_2?: (string | null) | undefined;
        address_line_3?: (string | null) | undefined;
        city?: (string | null) | undefined;
        region?: (string | null) | undefined;
        postal_code?: (string | null) | undefined;
        country: string;
        title?: (string | null) | undefined;
        contacts?: ({
            name: string;
            email_address?: (string | null) | undefined;
            phone_number?: (string | null) | undefined;
        }[] | null) | undefined;
        estimated_country?: string | undefined;
        estimated_region?: string | undefined;
        estimated_city?: string | undefined;
    };
    eei_form_status?: (("pending" | "cleared" | "approved" | "rejected" | "submitted") | null) | undefined;
    eei_form_url?: (string | null) | undefined;
    emissions?: (number | null) | undefined;
    emissions_unit?: (string | null) | undefined;
    exceptions?: ({
        updated_at: Date;
        created_at: Date;
        exception_type_label?: (string | null) | undefined;
        id: string;
        package_id?: (number | null) | undefined;
        resolution?: (string | null) | undefined;
        status: "in_progress" | "new" | "resolved";
        type: "change_of_address_request" | "customs_information_required" | "damaged_items" | "direct_payment_required" | "held_at_customs" | "inaccurate_object_details" | "incorrect_address" | "lost_in_transit" | "not_ready_for_delivery" | "not_ready_for_release" | "other" | "prepayment_required" | "requested_hold_to_collect" | "requested_hold_to_deliver" | "wrong_item";
    }[] | null) | undefined;
    hosted_session_id?: (number | null) | undefined;
    insurance_policy?: ({
        amount: number;
        amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
        id: string;
        insured_value: number;
        insured_value_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    } | null) | undefined;
    internal_reference?: (string | null) | undefined;
    log_request_id?: (string | null) | undefined;
    object_count: number;
    origin: {
        access_restrictions?: (("elevator_only" | "freight_elevator" | "loading_dock" | "loading_dock_low" | "low_clearance" | "non_paved" | "stairs_only" | "steep_gradient")[] | null) | undefined;
        address_line_1?: (string | null) | undefined;
        address_line_2?: (string | null) | undefined;
        address_line_3?: (string | null) | undefined;
        city?: (string | null) | undefined;
        region?: (string | null) | undefined;
        postal_code?: (string | null) | undefined;
        country: string;
        title?: (string | null) | undefined;
        contacts?: ({
            name: string;
            email_address?: (string | null) | undefined;
            phone_number?: (string | null) | undefined;
        }[] | null) | undefined;
        estimated_country?: string | undefined;
        estimated_region?: string | undefined;
        estimated_city?: string | undefined;
    };
    package_count: number;
    packages?: ({
        depth: number;
        eta?: (string | null) | undefined;
        handle_with_care: boolean;
        height: number;
        id: number;
        is_sufficiently_packed: boolean;
        objects: {
            internal_reference?: (string | null) | undefined;
            current_packing?: (("alcohol_case" | "lay_flat_wine_box" | "blanket" | "wardrobe_box" | "cardboard_box" | "chandelier_box" | "chair_box" | "cbin_closed" | "cbin_open" | "ply_box" | "fine_art_econo_crate" | "fine_art_international_crate" | "econo_crate" | "international_econo_crate" | "furniture_crate" | "international_furniture_crate" | "parcel_crate" | "museum_crate" | "international_museum_crate" | "foam_lined_box" | "cavity_box" | "strongbox" | "double_box" | "travel_frame" | "travel_frame_art" | "travel_frame_other" | "a_frame" | "slat_crate" | "tri_wall_crate" | "lockbox" | "no_packing" | "pallet" | "international_pallet" | "portfolio" | "rug_rolled" | "shadow_box" | "slipcase" | "slipcase_glass_tape" | "poly_cardboard" | "bubble_cardboard" | "garment_bag" | "poly_only" | "dartek_only" | "bubble_only" | "cling_wrap" | "cbin_communal" | "sonotube" | "stabilizing_box" | "shipping_tube_small" | "shipping_tube_large")[] | null) | undefined;
            details?: ({
                materials?: (("stone_marble" | "precious_stones" | "fiber_synthetic" | "fabric_natural" | "taxidermy" | "carbon_fiber" | "live_animal" | "paper" | "glass" | "presious_metals" | "particleboard" | "styrofoam" | "wood" | "photo_film" | "sand" | "metal" | "plexiglass" | "aquatic_life" | "canvas" | "drywall" | "hard_plastic" | "vinyl" | "soft_plastic" | "leather" | "rubber" | "concreate" | "paint" | "electronics" | "fiber_natural" | "gas" | "fabric_synthetic" | "CITES" | "liquids" | "salts")[] | null) | undefined;
                creation_date?: (string | null) | undefined;
                creator?: (string | null) | undefined;
                notes?: (string | null) | undefined;
                title?: (string | null) | undefined;
                is_fragile?: (boolean | null) | undefined;
                is_cites?: (boolean | null) | undefined;
            } | null) | undefined;
            height: number | string;
            width: number | string;
            weight?: ((number | string) | null) | undefined;
            value: number | string;
            depth?: ((number | string) | null) | undefined;
            images?: (string[] | null) | undefined;
            public_reference?: (string | null) | undefined;
            subtype: "painting_unframed" | "painting_framed" | "painting_framed_plexi" | "painting_framed_glass" | "work_on_paper_unframed" | "work_on_paper_framed" | "work_on_paper_framed_plexi" | "work_on_paper_framed_glass" | "mixed_media_unframed" | "mixed_media_framed" | "mixed_media_framed_plexi" | "mixed_media_framed_glass" | "photograph_unframed" | "photograph_framed" | "photograph_framed_plexi" | "photograph_framed_glass" | "new_media" | "sculpture" | "pedestal" | "pedestal_case_glass" | "pedestal_case_plexi" | "ceramic" | "neon" | "tapestry" | "other_art" | "table" | "chair" | "sofa_loveseat_chaise" | "floor_lamp" | "floor_lamp_shade" | "table_lamp" | "table_lamp_shade" | "sconce" | "ottoman" | "bookcase_storage" | "nightstand" | "armoire_dresser" | "carpet_rug" | "mirror" | "chandelier" | "bedframe" | "headboard" | "desk_vanity" | "media_console" | "other_furniture" | "earrings" | "necklace" | "bracelet" | "ring" | "brooch" | "watch" | "cufflinks" | "eyeglasses" | "set" | "precious_stones" | "snuff_box_cigarette_case" | "other_jewelry" | "vase_vessel" | "bowl" | "plaque" | "object_of_vertu" | "candelabra_candlestick" | "dinnerware" | "flatware" | "glassware" | "serveware" | "porcelain_plate" | "porcelain_bowl" | "tabletop_accessory" | "clock" | "other_decorative_arts" | "stamp" | "book" | "coin" | "document_manuscript" | "toy" | "miniature_model" | "figurine_doll" | "neon_sign" | "memorabilia" | "camera_electrical" | "other_collectibles" | "wine_bottle" | "spirits_bottle" | "beer_bottle" | "wine_case" | "spirits_case" | "beer_case" | "wine_barrel" | "spirits_barrel" | "beer_barrel" | "other_alcohols" | "car" | "motorcycle" | "bus" | "van" | "limousine" | "carriage" | "trailer" | "sidecar" | "other_automotive" | "clothing" | "footwear" | "handbag" | "accessories" | "other_fashion" | "musical_instrument" | "firearm_weapon" | "hunting_fishing" | "medical_equipment" | "other";
            unit_of_measurement?: (string | null) | undefined;
            weight_unit?: (string | null) | undefined;
            value_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
        }[];
        packing_materials: ("alcohol_case" | "lay_flat_wine_box" | "blanket" | "wardrobe_box" | "cardboard_box" | "chandelier_box" | "chair_box" | "cbin_closed" | "cbin_open" | "ply_box" | "fine_art_econo_crate" | "fine_art_international_crate" | "econo_crate" | "international_econo_crate" | "furniture_crate" | "international_furniture_crate" | "parcel_crate" | "museum_crate" | "international_museum_crate" | "foam_lined_box" | "cavity_box" | "strongbox" | "double_box" | "travel_frame" | "travel_frame_art" | "travel_frame_other" | "a_frame" | "slat_crate" | "tri_wall_crate" | "lockbox" | "no_packing" | "pallet" | "international_pallet" | "portfolio" | "rug_rolled" | "shadow_box" | "slipcase" | "slipcase_glass_tape" | "poly_cardboard" | "bubble_cardboard" | "garment_bag" | "poly_only" | "dartek_only" | "bubble_only" | "cling_wrap" | "cbin_communal" | "sonotube" | "stabilizing_box" | "shipping_tube_small" | "shipping_tube_large")[];
        status?: (("pending" | "transit" | "out_for_delivery" | "delivered" | "unknown" | "notfound" | "undelivered" | "exception" | "expired") | null) | undefined;
        unit_of_measurement?: (string | null) | undefined;
        weight: number;
        weight_unit: string;
        width: number;
    }[] | null) | undefined;
    payment_process?: (("checkout" | "checkout_direct" | "invoicing") | null) | undefined;
    public_reference?: (string | null) | undefined;
    quote_type: "parcel" | "premium" | "select" | "self_ship";
    schedule?: ({
        delivery_end?: (Date | null) | undefined;
        delivery_start?: (Date | null) | undefined;
        delivery_window_modifier: string;
        pickup_end?: (Date | null) | undefined;
        pickup_start?: (Date | null) | undefined;
        pickup_window_modifier: string;
    } | null) | undefined;
    services?: ({
        amount: number;
        amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
        is_requested?: boolean | undefined;
        is_required?: boolean | undefined;
        name: string;
        sub_subtype: string;
        subtype: "specialized" | "consolidated" | "freight" | "parcel" | "collection" | "delivery" | "location" | "unpacking" | "condition" | "installation" | "deinstallation" | "debris_disposal" | "site_visit" | "handling" | "packing" | "packing_materials" | "receive_release" | "warehouse" | "customs" | "coi" | "administration" | "taxes_duties" | "fees" | "security" | "equipment";
        type: "transport" | "location" | "handling" | "packing" | "storage" | "administration" | "taxes_duties_fees" | "security" | "equipment";
        included_services: any[];
    }[] | null) | undefined;
    shipping_notes?: (string | null) | undefined;
    shortcode: string;
    status: "pending" | "confirmed" | "collected" | "in_transit" | "completed";
    total: number;
    total_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    url?: (string | null) | undefined;
    tracking?: ({
        carrier_name: string;
        label_url?: (string | null) | undefined;
        package_id: number;
        tracking_number: string;
        url: string;
    }[] | null) | undefined;
};
export type EmailRule = {
    updated_at: Date;
    created_at: Date;
    id: number;
    email_notification_id: "booking" | "cancelled" | "collected" | "collection" | "complete" | "custom_quoted_dashboard" | "in_transit" | "invoice" | "self_ship_label" | "payment" | "scheduling" | "eei";
    recipients: ("payer" | "origin" | "destination")[];
};
export type EmailSubscription = {
    updated_at: Date;
    created_at: Date;
    id: number;
    email_notification_ids: ("booking" | "cancelled" | "collected" | "collection" | "complete" | "custom_quoted_dashboard" | "in_transit" | "invoice" | "self_ship_label" | "payment" | "scheduling" | "eei")[];
    email_address: string;
    name?: (string | null) | undefined;
};
export type HostedSession = {
    updated_at: Date;
    created_at: Date;
    id: number;
    additional_services?: (("assembly" | "debris_disposal" | "deinstallation" | "destination_additional_labor" | "destination_building_coi" | "destination_condition_check" | "destination_full_condition_report" | "destination_unpacking" | "double_blind_bols" | "installation" | "origin_building_coi" | "origin_condition_check" | "origin_full_condition_report" | "placement" | "signature_delivery" | "tarmac_supervision")[] | null) | undefined;
    cancel_url?: (string | null) | undefined;
    destination?: ({
        access_restrictions?: (("elevator_only" | "freight_elevator" | "loading_dock" | "loading_dock_low" | "low_clearance" | "non_paved" | "stairs_only" | "steep_gradient")[] | null) | undefined;
        address_line_1?: (string | null) | undefined;
        address_line_2?: (string | null) | undefined;
        address_line_3?: (string | null) | undefined;
        city?: (string | null) | undefined;
        region?: (string | null) | undefined;
        postal_code?: (string | null) | undefined;
        country: string;
        title?: (string | null) | undefined;
        contacts?: ({
            name: string;
            email_address?: (string | null) | undefined;
            phone_number?: (string | null) | undefined;
        }[] | null) | undefined;
        estimated_country?: string | undefined;
        estimated_region?: string | undefined;
        estimated_city?: string | undefined;
    } | null) | undefined;
    insurance?: (("arta_transit_insurance" | "no_arta_insurance") | null) | undefined;
    internal_reference?: (string | null) | undefined;
    objects: {
        internal_reference?: (string | null) | undefined;
        current_packing?: (("alcohol_case" | "lay_flat_wine_box" | "blanket" | "wardrobe_box" | "cardboard_box" | "chandelier_box" | "chair_box" | "cbin_closed" | "cbin_open" | "ply_box" | "fine_art_econo_crate" | "fine_art_international_crate" | "econo_crate" | "international_econo_crate" | "furniture_crate" | "international_furniture_crate" | "parcel_crate" | "museum_crate" | "international_museum_crate" | "foam_lined_box" | "cavity_box" | "strongbox" | "double_box" | "travel_frame" | "travel_frame_art" | "travel_frame_other" | "a_frame" | "slat_crate" | "tri_wall_crate" | "lockbox" | "no_packing" | "pallet" | "international_pallet" | "portfolio" | "rug_rolled" | "shadow_box" | "slipcase" | "slipcase_glass_tape" | "poly_cardboard" | "bubble_cardboard" | "garment_bag" | "poly_only" | "dartek_only" | "bubble_only" | "cling_wrap" | "cbin_communal" | "sonotube" | "stabilizing_box" | "shipping_tube_small" | "shipping_tube_large")[] | null) | undefined;
        details?: ({
            materials?: (("stone_marble" | "precious_stones" | "fiber_synthetic" | "fabric_natural" | "taxidermy" | "carbon_fiber" | "live_animal" | "paper" | "glass" | "presious_metals" | "particleboard" | "styrofoam" | "wood" | "photo_film" | "sand" | "metal" | "plexiglass" | "aquatic_life" | "canvas" | "drywall" | "hard_plastic" | "vinyl" | "soft_plastic" | "leather" | "rubber" | "concreate" | "paint" | "electronics" | "fiber_natural" | "gas" | "fabric_synthetic" | "CITES" | "liquids" | "salts")[] | null) | undefined;
            creation_date?: (string | null) | undefined;
            creator?: (string | null) | undefined;
            notes?: (string | null) | undefined;
            title?: (string | null) | undefined;
            is_fragile?: (boolean | null) | undefined;
            is_cites?: (boolean | null) | undefined;
        } | null) | undefined;
        height: number | string;
        width: number | string;
        weight?: ((number | string) | null) | undefined;
        value: number | string;
        depth?: ((number | string) | null) | undefined;
        images?: (string[] | null) | undefined;
        public_reference?: (string | null) | undefined;
        subtype: "painting_unframed" | "painting_framed" | "painting_framed_plexi" | "painting_framed_glass" | "work_on_paper_unframed" | "work_on_paper_framed" | "work_on_paper_framed_plexi" | "work_on_paper_framed_glass" | "mixed_media_unframed" | "mixed_media_framed" | "mixed_media_framed_plexi" | "mixed_media_framed_glass" | "photograph_unframed" | "photograph_framed" | "photograph_framed_plexi" | "photograph_framed_glass" | "new_media" | "sculpture" | "pedestal" | "pedestal_case_glass" | "pedestal_case_plexi" | "ceramic" | "neon" | "tapestry" | "other_art" | "table" | "chair" | "sofa_loveseat_chaise" | "floor_lamp" | "floor_lamp_shade" | "table_lamp" | "table_lamp_shade" | "sconce" | "ottoman" | "bookcase_storage" | "nightstand" | "armoire_dresser" | "carpet_rug" | "mirror" | "chandelier" | "bedframe" | "headboard" | "desk_vanity" | "media_console" | "other_furniture" | "earrings" | "necklace" | "bracelet" | "ring" | "brooch" | "watch" | "cufflinks" | "eyeglasses" | "set" | "precious_stones" | "snuff_box_cigarette_case" | "other_jewelry" | "vase_vessel" | "bowl" | "plaque" | "object_of_vertu" | "candelabra_candlestick" | "dinnerware" | "flatware" | "glassware" | "serveware" | "porcelain_plate" | "porcelain_bowl" | "tabletop_accessory" | "clock" | "other_decorative_arts" | "stamp" | "book" | "coin" | "document_manuscript" | "toy" | "miniature_model" | "figurine_doll" | "neon_sign" | "memorabilia" | "camera_electrical" | "other_collectibles" | "wine_bottle" | "spirits_bottle" | "beer_bottle" | "wine_case" | "spirits_case" | "beer_case" | "wine_barrel" | "spirits_barrel" | "beer_barrel" | "other_alcohols" | "car" | "motorcycle" | "bus" | "van" | "limousine" | "carriage" | "trailer" | "sidecar" | "other_automotive" | "clothing" | "footwear" | "handbag" | "accessories" | "other_fashion" | "musical_instrument" | "firearm_weapon" | "hunting_fishing" | "medical_equipment" | "other";
        unit_of_measurement?: (string | null) | undefined;
        weight_unit?: (string | null) | undefined;
        value_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    }[];
    origin: {
        access_restrictions?: (("elevator_only" | "freight_elevator" | "loading_dock" | "loading_dock_low" | "low_clearance" | "non_paved" | "stairs_only" | "steep_gradient")[] | null) | undefined;
        address_line_1?: (string | null) | undefined;
        address_line_2?: (string | null) | undefined;
        address_line_3?: (string | null) | undefined;
        city?: (string | null) | undefined;
        region?: (string | null) | undefined;
        postal_code?: (string | null) | undefined;
        country: string;
        title?: (string | null) | undefined;
        contacts?: ({
            name: string;
            email_address?: (string | null) | undefined;
            phone_number?: (string | null) | undefined;
        }[] | null) | undefined;
        estimated_country?: string | undefined;
        estimated_region?: string | undefined;
        estimated_city?: string | undefined;
    };
    preferred_quote_types?: (("parcel" | "premium" | "select" | "self_ship")[] | null) | undefined;
    public_reference?: (string | null) | undefined;
    shipping_notes?: (string | null) | undefined;
    success_url?: (string | null) | undefined;
    payment_process: "checkout" | "checkout_direct" | "invoicing";
    private_token: string;
    shortcode: string;
    status: "cancelled" | "closed" | "disqualified" | "expired" | "in_progress" | "pending" | "quoted";
    url?: (string | null) | undefined;
};
export type InvoicePayment = {
    updated_at: Date;
    created_at: Date;
    id: number;
    amount: number;
    amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    credit_id?: (string | null) | undefined;
    invoice_id?: (string | null) | undefined;
    paid_on: Date;
    payment_id?: (string | null) | undefined;
    shipment_id?: (string | null) | undefined;
};
export type Invoice = {
    updated_at: Date;
    created_at: Date;
    id: number;
    amount_owed: number;
    amount_owed_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    amount_paid: number;
    amount_paid_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    issued_on?: (Date | null) | undefined;
    shipment_id?: (string | null) | undefined;
    status: string;
    invoice_url?: (string | null) | undefined;
};
export type Log = {
    updated_at: Date;
    created_at: Date;
    id: number;
    api_key_id: number;
    arta_version: string;
    end_at: Date;
    method: string;
    path: string;
    query_params: string;
    request_body?: (string | null) | undefined;
    request_id: string;
    response_body?: (string | null) | undefined;
    start_at: Date;
    status: number;
};
export type Organization = {
    updated_at: Date;
    created_at: Date;
    api_version: string;
    id: number;
    name: string;
    billing_terms?: (string | null) | undefined;
    company_name?: (string | null) | undefined;
    display_name?: (string | null) | undefined;
    shortcode?: (string | null) | undefined;
    status?: (string | null) | undefined;
    stripe_customer_id?: (string | null) | undefined;
};
export type Payment = {
    updated_at: Date;
    created_at: Date;
    id: number;
    amount: number;
    amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    context: "hosted_checkout" | "invoiced";
    paid_on: Date;
};
export type Carrier = {
    code: string;
    name: string;
    phone_number: string;
    url: string;
};
export type TrackingEvent = {
    date: Date;
    location: string;
    summary: string;
};
export type Tracking = {
    carrier: {
        code: string;
        name: string;
        phone_number: string;
        url: string;
    };
    events: {
        date: Date;
        location: string;
        summary: string;
    }[];
    status: string;
    tracking_number: string;
};
export type Upload = {
    updated_at: Date;
    created_at: Date;
    id: number;
    document_type: "bill_of_lading" | "certificate_of_insurance" | "certificate_of_insurance_template" | "condition_report" | "condition_check" | "image" | "instructions" | "airway_bill" | "commercial_invoice" | "power_of_attorney" | "proof_of_export" | "proof_of_delivery" | "quote" | "shipping_label" | "other";
    document_type_label?: (string | null) | undefined;
    download_url?: (string | null) | undefined;
    file_name: string;
    mime_type: "application/pdf" | "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "image/jpeg" | "image/png" | "text/csv" | "video/mp4" | "video/quicktime" | "application/msword";
    size: number;
    status: string;
    presigned_url: string;
};
export type WebhookDelivery = {
    updated_at: Date;
    created_at: Date;
    id: string;
    resource_id: number;
    resource_type: "ping" | "request" | "shipment";
    response_status_code: number;
    status: "delivered" | "failed";
    type: "request.created" | "request.status.updated" | "shipment.created" | "shipment.eei_form_status.updated" | "shipment.schedule.updated" | "shipment.status.updated" | "shipment.tracking.updated" | "ping";
    webhook_id: number;
    webhook_url: string;
    next_retry?: (string | null) | undefined;
    request_body?: (string | null) | undefined;
    response_body?: (string | null) | undefined;
};
export type Webhook = {
    updated_at: Date;
    created_at: Date;
    id: number;
    name: string;
    url: string;
};
export type ArtaService = {
    amount: number;
    amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    is_requested?: boolean | undefined;
    is_required?: boolean | undefined;
    name: string;
    sub_subtype: string;
    subtype: "specialized" | "consolidated" | "freight" | "parcel" | "collection" | "delivery" | "location" | "unpacking" | "condition" | "installation" | "deinstallation" | "debris_disposal" | "site_visit" | "handling" | "packing" | "packing_materials" | "receive_release" | "warehouse" | "customs" | "coi" | "administration" | "taxes_duties" | "fees" | "security" | "equipment";
    type: "transport" | "location" | "handling" | "packing" | "storage" | "administration" | "taxes_duties_fees" | "security" | "equipment";
    included_services: any[];
};
export type Disqualification = {
    quote_types: ("parcel" | "premium" | "select" | "self_ship")[];
    reason?: (string | null) | undefined;
    reason_code: "cannot_be_packed" | "client_timeout_reached" | "external_service_unavailable" | "object_not_supported" | "out_of_network" | "over_size" | "over_value" | "over_volume" | "over_weight" | "requested_service_unavailable" | "too_many_items" | "under_value" | "under_volume" | "under_weight";
};
export type Detail = {
    materials?: (("stone_marble" | "precious_stones" | "fiber_synthetic" | "fabric_natural" | "taxidermy" | "carbon_fiber" | "live_animal" | "paper" | "glass" | "presious_metals" | "particleboard" | "styrofoam" | "wood" | "photo_film" | "sand" | "metal" | "plexiglass" | "aquatic_life" | "canvas" | "drywall" | "hard_plastic" | "vinyl" | "soft_plastic" | "leather" | "rubber" | "concreate" | "paint" | "electronics" | "fiber_natural" | "gas" | "fabric_synthetic" | "CITES" | "liquids" | "salts")[] | null) | undefined;
    creation_date?: (string | null) | undefined;
    creator?: (string | null) | undefined;
    notes?: (string | null) | undefined;
    title?: (string | null) | undefined;
    is_fragile?: (boolean | null) | undefined;
    is_cites?: (boolean | null) | undefined;
};
export type AdditionalService = "assembly" | "debris_disposal" | "deinstallation" | "destination_additional_labor" | "destination_building_coi" | "destination_condition_check" | "destination_full_condition_report" | "destination_unpacking" | "double_blind_bols" | "installation" | "origin_building_coi" | "origin_condition_check" | "origin_full_condition_report" | "placement" | "signature_delivery" | "tarmac_supervision";
export type SupportedCurrency = "CAD" | "EUR" | "GBP" | "HKD" | "USD";
export type ArtaLocation = {
    access_restrictions?: (("elevator_only" | "freight_elevator" | "loading_dock" | "loading_dock_low" | "low_clearance" | "non_paved" | "stairs_only" | "steep_gradient")[] | null) | undefined;
    address_line_1?: (string | null) | undefined;
    address_line_2?: (string | null) | undefined;
    address_line_3?: (string | null) | undefined;
    city?: (string | null) | undefined;
    region?: (string | null) | undefined;
    postal_code?: (string | null) | undefined;
    country: string;
    title?: (string | null) | undefined;
    contacts?: ({
        name: string;
        email_address?: (string | null) | undefined;
        phone_number?: (string | null) | undefined;
    }[] | null) | undefined;
    estimated_country?: string | undefined;
    estimated_region?: string | undefined;
    estimated_city?: string | undefined;
};
export type Insurance = "arta_transit_insurance" | "no_arta_insurance";
export type ArtaObject = {
    internal_reference?: (string | null) | undefined;
    current_packing?: (("alcohol_case" | "lay_flat_wine_box" | "blanket" | "wardrobe_box" | "cardboard_box" | "chandelier_box" | "chair_box" | "cbin_closed" | "cbin_open" | "ply_box" | "fine_art_econo_crate" | "fine_art_international_crate" | "econo_crate" | "international_econo_crate" | "furniture_crate" | "international_furniture_crate" | "parcel_crate" | "museum_crate" | "international_museum_crate" | "foam_lined_box" | "cavity_box" | "strongbox" | "double_box" | "travel_frame" | "travel_frame_art" | "travel_frame_other" | "a_frame" | "slat_crate" | "tri_wall_crate" | "lockbox" | "no_packing" | "pallet" | "international_pallet" | "portfolio" | "rug_rolled" | "shadow_box" | "slipcase" | "slipcase_glass_tape" | "poly_cardboard" | "bubble_cardboard" | "garment_bag" | "poly_only" | "dartek_only" | "bubble_only" | "cling_wrap" | "cbin_communal" | "sonotube" | "stabilizing_box" | "shipping_tube_small" | "shipping_tube_large")[] | null) | undefined;
    details?: ({
        materials?: (("stone_marble" | "precious_stones" | "fiber_synthetic" | "fabric_natural" | "taxidermy" | "carbon_fiber" | "live_animal" | "paper" | "glass" | "presious_metals" | "particleboard" | "styrofoam" | "wood" | "photo_film" | "sand" | "metal" | "plexiglass" | "aquatic_life" | "canvas" | "drywall" | "hard_plastic" | "vinyl" | "soft_plastic" | "leather" | "rubber" | "concreate" | "paint" | "electronics" | "fiber_natural" | "gas" | "fabric_synthetic" | "CITES" | "liquids" | "salts")[] | null) | undefined;
        creation_date?: (string | null) | undefined;
        creator?: (string | null) | undefined;
        notes?: (string | null) | undefined;
        title?: (string | null) | undefined;
        is_fragile?: (boolean | null) | undefined;
        is_cites?: (boolean | null) | undefined;
    } | null) | undefined;
    height: number | string;
    width: number | string;
    weight?: ((number | string) | null) | undefined;
    value: number | string;
    depth?: ((number | string) | null) | undefined;
    images?: (string[] | null) | undefined;
    public_reference?: (string | null) | undefined;
    subtype: "painting_unframed" | "painting_framed" | "painting_framed_plexi" | "painting_framed_glass" | "work_on_paper_unframed" | "work_on_paper_framed" | "work_on_paper_framed_plexi" | "work_on_paper_framed_glass" | "mixed_media_unframed" | "mixed_media_framed" | "mixed_media_framed_plexi" | "mixed_media_framed_glass" | "photograph_unframed" | "photograph_framed" | "photograph_framed_plexi" | "photograph_framed_glass" | "new_media" | "sculpture" | "pedestal" | "pedestal_case_glass" | "pedestal_case_plexi" | "ceramic" | "neon" | "tapestry" | "other_art" | "table" | "chair" | "sofa_loveseat_chaise" | "floor_lamp" | "floor_lamp_shade" | "table_lamp" | "table_lamp_shade" | "sconce" | "ottoman" | "bookcase_storage" | "nightstand" | "armoire_dresser" | "carpet_rug" | "mirror" | "chandelier" | "bedframe" | "headboard" | "desk_vanity" | "media_console" | "other_furniture" | "earrings" | "necklace" | "bracelet" | "ring" | "brooch" | "watch" | "cufflinks" | "eyeglasses" | "set" | "precious_stones" | "snuff_box_cigarette_case" | "other_jewelry" | "vase_vessel" | "bowl" | "plaque" | "object_of_vertu" | "candelabra_candlestick" | "dinnerware" | "flatware" | "glassware" | "serveware" | "porcelain_plate" | "porcelain_bowl" | "tabletop_accessory" | "clock" | "other_decorative_arts" | "stamp" | "book" | "coin" | "document_manuscript" | "toy" | "miniature_model" | "figurine_doll" | "neon_sign" | "memorabilia" | "camera_electrical" | "other_collectibles" | "wine_bottle" | "spirits_bottle" | "beer_bottle" | "wine_case" | "spirits_case" | "beer_case" | "wine_barrel" | "spirits_barrel" | "beer_barrel" | "other_alcohols" | "car" | "motorcycle" | "bus" | "van" | "limousine" | "carriage" | "trailer" | "sidecar" | "other_automotive" | "clothing" | "footwear" | "handbag" | "accessories" | "other_fashion" | "musical_instrument" | "firearm_weapon" | "hunting_fishing" | "medical_equipment" | "other";
    unit_of_measurement?: (string | null) | undefined;
    weight_unit?: (string | null) | undefined;
    value_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
};
export type QuoteType = "parcel" | "premium" | "select" | "self_ship";
export type Contact = {
    name: string;
    email_address?: (string | null) | undefined;
    phone_number?: (string | null) | undefined;
};
export type ShipmentExceptionStatus = "in_progress" | "new" | "resolved";
export type PackageStatus = "pending" | "transit" | "out_for_delivery" | "delivered" | "unknown" | "notfound" | "undelivered" | "exception" | "expired";
export type Package = {
    depth: number;
    eta?: (string | null) | undefined;
    handle_with_care: boolean;
    height: number;
    id: number;
    is_sufficiently_packed: boolean;
    objects: {
        internal_reference?: (string | null) | undefined;
        current_packing?: (("alcohol_case" | "lay_flat_wine_box" | "blanket" | "wardrobe_box" | "cardboard_box" | "chandelier_box" | "chair_box" | "cbin_closed" | "cbin_open" | "ply_box" | "fine_art_econo_crate" | "fine_art_international_crate" | "econo_crate" | "international_econo_crate" | "furniture_crate" | "international_furniture_crate" | "parcel_crate" | "museum_crate" | "international_museum_crate" | "foam_lined_box" | "cavity_box" | "strongbox" | "double_box" | "travel_frame" | "travel_frame_art" | "travel_frame_other" | "a_frame" | "slat_crate" | "tri_wall_crate" | "lockbox" | "no_packing" | "pallet" | "international_pallet" | "portfolio" | "rug_rolled" | "shadow_box" | "slipcase" | "slipcase_glass_tape" | "poly_cardboard" | "bubble_cardboard" | "garment_bag" | "poly_only" | "dartek_only" | "bubble_only" | "cling_wrap" | "cbin_communal" | "sonotube" | "stabilizing_box" | "shipping_tube_small" | "shipping_tube_large")[] | null) | undefined;
        details?: ({
            materials?: (("stone_marble" | "precious_stones" | "fiber_synthetic" | "fabric_natural" | "taxidermy" | "carbon_fiber" | "live_animal" | "paper" | "glass" | "presious_metals" | "particleboard" | "styrofoam" | "wood" | "photo_film" | "sand" | "metal" | "plexiglass" | "aquatic_life" | "canvas" | "drywall" | "hard_plastic" | "vinyl" | "soft_plastic" | "leather" | "rubber" | "concreate" | "paint" | "electronics" | "fiber_natural" | "gas" | "fabric_synthetic" | "CITES" | "liquids" | "salts")[] | null) | undefined;
            creation_date?: (string | null) | undefined;
            creator?: (string | null) | undefined;
            notes?: (string | null) | undefined;
            title?: (string | null) | undefined;
            is_fragile?: (boolean | null) | undefined;
            is_cites?: (boolean | null) | undefined;
        } | null) | undefined;
        height: number | string;
        width: number | string;
        weight?: ((number | string) | null) | undefined;
        value: number | string;
        depth?: ((number | string) | null) | undefined;
        images?: (string[] | null) | undefined;
        public_reference?: (string | null) | undefined;
        subtype: "painting_unframed" | "painting_framed" | "painting_framed_plexi" | "painting_framed_glass" | "work_on_paper_unframed" | "work_on_paper_framed" | "work_on_paper_framed_plexi" | "work_on_paper_framed_glass" | "mixed_media_unframed" | "mixed_media_framed" | "mixed_media_framed_plexi" | "mixed_media_framed_glass" | "photograph_unframed" | "photograph_framed" | "photograph_framed_plexi" | "photograph_framed_glass" | "new_media" | "sculpture" | "pedestal" | "pedestal_case_glass" | "pedestal_case_plexi" | "ceramic" | "neon" | "tapestry" | "other_art" | "table" | "chair" | "sofa_loveseat_chaise" | "floor_lamp" | "floor_lamp_shade" | "table_lamp" | "table_lamp_shade" | "sconce" | "ottoman" | "bookcase_storage" | "nightstand" | "armoire_dresser" | "carpet_rug" | "mirror" | "chandelier" | "bedframe" | "headboard" | "desk_vanity" | "media_console" | "other_furniture" | "earrings" | "necklace" | "bracelet" | "ring" | "brooch" | "watch" | "cufflinks" | "eyeglasses" | "set" | "precious_stones" | "snuff_box_cigarette_case" | "other_jewelry" | "vase_vessel" | "bowl" | "plaque" | "object_of_vertu" | "candelabra_candlestick" | "dinnerware" | "flatware" | "glassware" | "serveware" | "porcelain_plate" | "porcelain_bowl" | "tabletop_accessory" | "clock" | "other_decorative_arts" | "stamp" | "book" | "coin" | "document_manuscript" | "toy" | "miniature_model" | "figurine_doll" | "neon_sign" | "memorabilia" | "camera_electrical" | "other_collectibles" | "wine_bottle" | "spirits_bottle" | "beer_bottle" | "wine_case" | "spirits_case" | "beer_case" | "wine_barrel" | "spirits_barrel" | "beer_barrel" | "other_alcohols" | "car" | "motorcycle" | "bus" | "van" | "limousine" | "carriage" | "trailer" | "sidecar" | "other_automotive" | "clothing" | "footwear" | "handbag" | "accessories" | "other_fashion" | "musical_instrument" | "firearm_weapon" | "hunting_fishing" | "medical_equipment" | "other";
        unit_of_measurement?: (string | null) | undefined;
        weight_unit?: (string | null) | undefined;
        value_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    }[];
    packing_materials: ("alcohol_case" | "lay_flat_wine_box" | "blanket" | "wardrobe_box" | "cardboard_box" | "chandelier_box" | "chair_box" | "cbin_closed" | "cbin_open" | "ply_box" | "fine_art_econo_crate" | "fine_art_international_crate" | "econo_crate" | "international_econo_crate" | "furniture_crate" | "international_furniture_crate" | "parcel_crate" | "museum_crate" | "international_museum_crate" | "foam_lined_box" | "cavity_box" | "strongbox" | "double_box" | "travel_frame" | "travel_frame_art" | "travel_frame_other" | "a_frame" | "slat_crate" | "tri_wall_crate" | "lockbox" | "no_packing" | "pallet" | "international_pallet" | "portfolio" | "rug_rolled" | "shadow_box" | "slipcase" | "slipcase_glass_tape" | "poly_cardboard" | "bubble_cardboard" | "garment_bag" | "poly_only" | "dartek_only" | "bubble_only" | "cling_wrap" | "cbin_communal" | "sonotube" | "stabilizing_box" | "shipping_tube_small" | "shipping_tube_large")[];
    status?: (("pending" | "transit" | "out_for_delivery" | "delivered" | "unknown" | "notfound" | "undelivered" | "exception" | "expired") | null) | undefined;
    unit_of_measurement?: (string | null) | undefined;
    weight: number;
    weight_unit: string;
    width: number;
};
export type ShipmentExceptionTypeId = "change_of_address_request" | "customs_information_required" | "damaged_items" | "direct_payment_required" | "held_at_customs" | "inaccurate_object_details" | "incorrect_address" | "lost_in_transit" | "not_ready_for_delivery" | "not_ready_for_release" | "other" | "prepayment_required" | "requested_hold_to_collect" | "requested_hold_to_deliver" | "wrong_item";
export type ShipmentException = {
    updated_at: Date;
    created_at: Date;
    exception_type_label?: (string | null) | undefined;
    id: string;
    package_id?: (number | null) | undefined;
    resolution?: (string | null) | undefined;
    status: "in_progress" | "new" | "resolved";
    type: "change_of_address_request" | "customs_information_required" | "damaged_items" | "direct_payment_required" | "held_at_customs" | "inaccurate_object_details" | "incorrect_address" | "lost_in_transit" | "not_ready_for_delivery" | "not_ready_for_release" | "other" | "prepayment_required" | "requested_hold_to_collect" | "requested_hold_to_deliver" | "wrong_item";
};
export type ShipmentSchedule = {
    delivery_end?: (Date | null) | undefined;
    delivery_start?: (Date | null) | undefined;
    delivery_window_modifier: string;
    pickup_end?: (Date | null) | undefined;
    pickup_start?: (Date | null) | undefined;
    pickup_window_modifier: string;
};
export type ShipmentTracking = {
    carrier_name: string;
    label_url?: (string | null) | undefined;
    package_id: number;
    tracking_number: string;
    url: string;
};
export type InsurancePolicy = {
    amount: number;
    amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    id: string;
    insured_value: number;
    insured_value_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
};
export type Quote = {
    id: number;
    included_services: {
        amount: number;
        amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
        is_requested?: boolean | undefined;
        is_required?: boolean | undefined;
        name: string;
        sub_subtype: string;
        subtype: "specialized" | "consolidated" | "freight" | "parcel" | "collection" | "delivery" | "location" | "unpacking" | "condition" | "installation" | "deinstallation" | "debris_disposal" | "site_visit" | "handling" | "packing" | "packing_materials" | "receive_release" | "warehouse" | "customs" | "coi" | "administration" | "taxes_duties" | "fees" | "security" | "equipment";
        type: "transport" | "location" | "handling" | "packing" | "storage" | "administration" | "taxes_duties_fees" | "security" | "equipment";
        included_services: any[];
    }[];
    included_insurance_policy?: ({
        amount: number;
        amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
        id: string;
        insured_value: number;
        insured_value_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
    } | null) | undefined;
    optional_services: {
        amount: number;
        amount_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
        is_requested?: boolean | undefined;
        is_required?: boolean | undefined;
        name: string;
        sub_subtype: string;
        subtype: "specialized" | "consolidated" | "freight" | "parcel" | "collection" | "delivery" | "location" | "unpacking" | "condition" | "installation" | "deinstallation" | "debris_disposal" | "site_visit" | "handling" | "packing" | "packing_materials" | "receive_release" | "warehouse" | "customs" | "coi" | "administration" | "taxes_duties" | "fees" | "security" | "equipment";
        type: "transport" | "location" | "handling" | "packing" | "storage" | "administration" | "taxes_duties_fees" | "security" | "equipment";
        included_services: any[];
    }[];
    quote_type: "parcel" | "premium" | "select" | "self_ship";
    status: string;
    total: number;
    total_currency: "CAD" | "EUR" | "GBP" | "HKD" | "USD";
};
export type QuoteRequestListItem = {
    updated_at: Date;
    created_at: Date;
    id: string;
    bookable: {
        missing: string[];
        ready: boolean;
    };
    destination: {
        access_restrictions?: (("elevator_only" | "freight_elevator" | "loading_dock" | "loading_dock_low" | "low_clearance" | "non_paved" | "stairs_only" | "steep_gradient")[] | null) | undefined;
        address_line_1?: (string | null) | undefined;
        address_line_2?: (string | null) | undefined;
        address_line_3?: (string | null) | undefined;
        city?: (string | null) | undefined;
        region?: (string | null) | undefined;
        postal_code?: (string | null) | undefined;
        country: string;
        title?: (string | null) | undefined;
        contacts?: ({
            name: string;
            email_address?: (string | null) | undefined;
            phone_number?: (string | null) | undefined;
        }[] | null) | undefined;
        estimated_country?: string | undefined;
        estimated_region?: string | undefined;
        estimated_city?: string | undefined;
    };
    hosted_session_id: number | null;
    insurance: ("arta_transit_insurance" | "no_arta_insurance") | null;
    internal_reference: string | null;
    log_request_id: string;
    object_count: number | null;
    origin: {
        access_restrictions?: (("elevator_only" | "freight_elevator" | "loading_dock" | "loading_dock_low" | "low_clearance" | "non_paved" | "stairs_only" | "steep_gradient")[] | null) | undefined;
        address_line_1?: (string | null) | undefined;
        address_line_2?: (string | null) | undefined;
        address_line_3?: (string | null) | undefined;
        city?: (string | null) | undefined;
        region?: (string | null) | undefined;
        postal_code?: (string | null) | undefined;
        country: string;
        title?: (string | null) | undefined;
        contacts?: ({
            name: string;
            email_address?: (string | null) | undefined;
            phone_number?: (string | null) | undefined;
        }[] | null) | undefined;
        estimated_country?: string | undefined;
        estimated_region?: string | undefined;
        estimated_city?: string | undefined;
    };
    public_reference?: (string | null) | undefined;
    quote_types: ("parcel" | "premium" | "select" | "self_ship")[];
    shortcode: string;
    status: "cancelled" | "closed" | "disqualified" | "expired" | "in_progress" | "pending" | "quoted";
    tags?: any;
};
export type EmailNotificationId = "booking" | "cancelled" | "collected" | "collection" | "complete" | "custom_quoted_dashboard" | "in_transit" | "invoice" | "self_ship_label" | "payment" | "scheduling" | "eei";
export type Recipient = "payer" | "origin" | "destination";
export type ArtaMimeType = "application/pdf" | "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "image/jpeg" | "image/png" | "text/csv" | "video/mp4" | "video/quicktime" | "application/msword";
export type ArtaDocumentType = "bill_of_lading" | "certificate_of_insurance" | "certificate_of_insurance_template" | "condition_report" | "condition_check" | "image" | "instructions" | "airway_bill" | "commercial_invoice" | "power_of_attorney" | "proof_of_export" | "proof_of_delivery" | "quote" | "shipping_label" | "other";
