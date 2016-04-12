/*
    Returns the list of countries in our database (stored in the
    countries collection)
    The schema in this collection is:

    [{ "name" : "Spain", "code" : "ES"}]
*/
exports.getCountries = function(req, res, next) {
    var db = req.db;
    db.collection('countries').find().toArray(function(err, data) {
        res.send(data);
    });
}

/*
    Given a country, return the list of cities in that country.

    NOTE: the schema in this collection is a big different. We have one unique
    element (data[0]) which contains a big object with the format:

    {
        "Country name" : ["city1", "city2"..."cityN"]
    }
*/
exports.getCities = function(req, res, next) {
    var country = req.params.country;
    var db = req.db;

    db.collection('cities').find().toArray(function(err, data) {
        res.send(data[0][country]);
    });
}