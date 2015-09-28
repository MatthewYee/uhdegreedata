/**
 * Analytics for UH data set
 *
 * Created by MGY on 9/27/2015.
 */
/* globals _, uhdata */
/* exported testdata, maxDegrees,totalDegreesbyYear,percentagehawaiian,listCampus,listCampusDegree */
/* exported totalDegreesbyYear, listCampus,listyearlyDegree,maxDegrees,doctoralDegreePrograms */
/* exported totalDegrees, percentagehawaiian,  */
/**
 * provides small set of records for the UH data set
 */
var testdata = uhdata.slice(0, 2).concat(_.find(uhdata, ishawaiian));

/**
 * Reduction function for accumulatng the number of degrees
 * @param memo The Accumulator
 * @param record The UH Data record from which award numbers will be extracted
 * @returns  The total of the accumulator and wards in this record
 */
function addDegrees(memo, record) {
  return memo + record['AWARDS'];
}

/**
 * Returns the total number of degrees in this data set
 * @param data The data set being passed which for this case is UH data set
 * @returns  The total number of degrees
 */
function totalDegrees(data) {
  return _.reduce(data, addDegrees, 0);

}
/**
 * Predicate function returning true if the passed
 * @param record The UH data set record
 * @returns  True if concerns Hawaiian Ancestry
 */
function ishawaiian(record) {
  return record["HAWAIIAN_LEGACY"] === "HAWAIIAN";
}

/**
 * Filters dataset to those records concerning Hawaiian Ancestry
 * @param data The UH dataset
 * @returns An array of records of those with Hawaiian Legacy
 */
function hawaiianlegacy(data) {
  return _.filter(data, ishawaiian);
}
/**
 * Returns the total number of degrees awarded to those of Hawaiian Acestry
 * @param data The UH dataset
 * @returns  Total number of degrees awarded to those of Hawaiian Acestry
 */
function totalhawaiianlegacy(data) {
  return _.reduce(hawaiianlegacy(data), addDegrees, 0);
}

/**
 * Return the total percentage of degrees to those of Hawaiian ancestry in the dataset
 * @param data The UH dataset
 * @returns  Percentage of degrees to Hawaiians
 */
function percentagehawaiian(data) {
  return (totalhawaiianlegacy(data) / totalDegrees(data)) * 100;
}

/**
 * Returns a Predicate function that returns True if the passed records is from the given year
 * @param year The year of interest
 * @returns  a function that returns true if the record is from the year
 */
function makeyearfilter(year) {
  return function (record) {
    return record["FISCAL_YEAR"] === year;
  };
}

/**
 * Filters the dataset to those records from the passed year
 * @param data The UH dataset
 * @param year  the year of interest is an integer
 * @returns  the array of records from the given year
 */
function dataforyear(data, year) {
  return _.filter(data, makeyearfilter(year));
}

/**
 * Returns the total number of degrees awarded in the given year
 * @param data The UH data set
 * @param year The year of interest
 * @returns  The total Degree from that year
 */
function totalDegreesbyYear(data, year) {
  return _.reduce(dataforyear(data, year), addDegrees, 0);
}

/**
 * Returns the campuses in the passed data set
 * @param data The UH dataset
 * @returns  An Array of Strings, one for each campus in dataset
 */
function listCampus(data) {
  return _.uniq(_.pluck(data, "CAMPUS"));
}
/**
 * Groups the dataset by campus
 * @param data The UH dataset
 * @returns  An object that groups the dataset records by campus
 */
function groupByCampus(data) {
  return _.groupBy(data, "CAMPUS");
}

/**
 * Returns an object of key/value pairs. Keys are campuses, values are the number of degrees at that campus
 * @param val the UH dataset
 * @returns  The degrees per campus ~~~~~~~~~~~~~~~~YOU STOP HERE AT 16:52 for WOD
 */
function sumbyCampus(val) {
  return _.reduce(val, addDegrees, 0);
}
/**
 * Return an object of key/value pair: Key are campuses, values are the number of degrees at that campus
 * @param data The UH dataset
 * @returns  The degrees per campus
 */
function listCampusDegree(data) {
  return _.mapObject(groupByCampus(data), sumbyCampus);
}

/**
 * Group the dataset by year
 * @param data The UH dataset
 * @returns  An object that groups the dataset records by year
 */
function groupByYear(data) {
  return _.groupBy(data, "FISCAL_YEAR");
}

/**
 * Return the total amount of degrees awarded by year in the data set
 * @param val  The UH dataset
 * @param key The maximum number of degrees
 * @returns
 */
function sumbyYear(val) {
  return _.reduce(val, addDegrees, 0);
}

/**
 * Return the maximum number of degrees awarded in a sincle year in the dataset
 * @param data The UH dataset
 * @returns  The maximum number of degrees
 */
function listyearlyDegree(data) {
  return _.max(_.mapObject(groupByYear(data), sumbyYear));
}
function maxDegrees(data) {
  return _.max(_.mapObject(groupByYear(data),
      function (val)
  {
    return _.reduce(val, addDegrees, 0);
  }));
}
/**
 * Predicate function indicating if the passed record concerns a doctoral degree
 * @param record THe record of interest
 * @returns  true if concerns is the doctoral degree
 */
function isDoctoralDegree(record) {
  return record["OUTCOME"] === "Doctoral Degrees"
}

/**
 * Filters the data into those that concern a doctoral degreee
 * @param data The UH dataset
 * @returns An array of records concerning a doctoral degree
 */
function doctoralList(data) {
  return _.filter(data, isDoctoralDegree);
}
/**
 * Returns the list of programs with a doctoral degree
 * @param data The UH dataset
 * @returns  A list of strings, one per program with a doctoral degree
 */

function doctoralDegreePrograms(data) {
  return _.unique(_.pluck(doctoralList(data), "CIP_DESC"));
}