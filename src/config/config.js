let domain, protocol;

if (process.env.NODE_ENV === "production") {
	domain = "folio-productions-fa-backend.herokuapp.com";
	protocol = "https";
} else {
	domain = "localhost:4000";
	protocol = "http";
}

export const CONNECTION = `${protocol}://${domain}`;
