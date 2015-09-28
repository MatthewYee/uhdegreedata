# Overview

Provides seven functions computing analytics over the [Hawaii Open Dataset for the UH Degree data](http://philipmjohnson.github.io/ics314f15/morea/underscore/experience-underscore.html)

# Installation

Provide the following scripts in your file:
```
<script src="//philipmjohnson.github.io/ics314f15/morea/underscore/underscore-min.js"></script>
<script src="//philipmjohnson.github.io/ics314f15/morea/underscore/uhdata.js"></script>
<script src="uhdatafunctions.js"></script>
```

# Usage

Here are example calls to the analytic functions
```
<script>
    console.log("Total Degrees", totalDegrees(uhdata));
    console.log("Percentage Hawaiian", percentagehawaiian(uhdata));
    console.log("Total Degrees By Year", totalDegreesbyYear(uhdata, 2012));
    console.log("List Campuses", listCampus(uhdata));
    console.log("List Campus Degrees", listCampusDegree(uhdata));
    console.log("Max Degrees", maxDegrees(uhdata));
    console.log("Doctoral Degree Programs", doctoralDegreePrograms(uhdata));
</script>
```

Consult the uhdatafunctions.js file for more details on these functions

# Credit

Uses the [Underscore](http://http://underscorejs.org/) library.