export type LoginResponse =
    | {
        token: string;
        authorized: boolean;
        msg: string;
    }
    | {
        msg: string;
    };

export type emailResponse =
    | {
        msg: string;
        token: string;
    }
    | {
        msg: string;
    }

export type product = 
| {
    title: String;
    price: string;
    description: String;
    image: string;
}