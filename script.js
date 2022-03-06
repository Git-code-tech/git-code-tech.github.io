class Demo {
    constructor() {
        this.form = document.querySelector('#form')
        this.dateInput = document.querySelector('#date')
        this.timeInput = document.querySelector('#time')
        this.latitudeInput = document.querySelector('#latitude')
        this.longitudeInput = document.querySelector('#longitude')
        this.moonQuarterApproximationInput = document.querySelector('#moonQuarterApproximation')
        this.moonTable = document.querySelector('#moon')
        this.moonOrbitTable = document.querySelector('#moonOrbit')
        this.calcShadowsCheckbox = document.querySelector('#calcShadows')
        this.handleSubmit = this.handleSubmit.bind(this)
        this.form.addEventListener('submit', this.handleSubmit)
        this.texar = document.querySelector(`#txtar`)

        this.from = document.querySelector('#from');
        this.to = document.querySelector('#to');
        this.count = 1;
    }
    handleSubmit(e) {
        e.preventDefault()      
        var daysOfYear = this.getdates(this.from.value, this.to.value);
        this.loopthru(daysOfYear);            
    }

    getdates(from, to) {
        var daysOfYear = [];

        var parts = from.split('-');
        //console.log(parts);
        var fromd = new Date(parts[0], parts[1] - 1, parts[2]);

        var parts1 = to.split('-');
        //console.log(parts1);
        var tod = new Date(parts1[0], parts1[1] - 1, parts1[2]);

        //console.log(fromd + "," + tod);
        for (var d = new Date(fromd.getFullYear(), fromd.getMonth(), fromd.getDate()); d <= tod; d.setDate(d.getDate() + 1)) {
            //console.log(d);
            daysOfYear.push(new Date(d));
        }
        return daysOfYear;
    }

    loopthru(daysOfYear) {
        var count = 0;
        daysOfYear.forEach(element => {
            var yr = element.getUTCFullYear();
            var mon = element.getUTCMonth();
            var dy = element.getUTCDate();
            //console.log((count++) + " of " + daysOfYear.length);
            this.Process(yr, mon, dy);
        });
    }

    Process(y, m, d) {
        //console.log(y + "/" + m + "/" + d);
        const origin = {
            year: parseInt(y), month: parseInt(m), day: parseInt(d), hours: 11, minutes: 0, seconds: 0,
            latitude: 40.7128, longitude: -73.9352,
            moonQuarterApproximationValue: 1.5
        }
        const showShadows = true;
        this.calculate(origin, showShadows);
    }

    calculate(origin, showShadows) {
        import('./src/Ephemeris.js').then((module) => {
            const ephemeris = new module.default({ ...origin, calculateShadows: showShadows });
            //console.log('EPHEMERIS RESULTS FOR ${this.dateInput.value} -- ${this.timeInput.value} UTC}', ephemeris);
            //this.displayvalues(ephemeris, showShadows);
            this.texar.value += '\r\n'+ ephemeris.getString();
        });
    }

    displayui(ephemeris, showShadows) {
        ephemeris.Results.forEach(result => {
            const ddEl = document.querySelector(`#${result.key}-dd`)
            if (ddEl) ddEl.innerHTML = result.position.apparentLongitude.toFixed(4)

            const dmsEl = document.querySelector(`#${result.key}-dms`)
            if (dmsEl) dmsEl.innerHTML = result.position.apparentLongitudeString

            const retroEl = document.querySelector(`#${result.key}-motion`)
            const isRetrograde = result.motion.isRetrograde ? 'Retrograde' : 'Direct'
            if (retroEl) retroEl.innerHTML = isRetrograde
            if (showShadows && retroEl) {
                if (result.motion.withinPreRetrogradeShadow) {
                    retroEl.innerHTML = `${isRetrograde}, Pre-retrograde shadow`
                }

                if (result.motion.withinPostRetrogradeShadow) {
                    retroEl.innerHTML = `${isRetrograde}, Post-retrograde shadow`
                }
            }
        })
        const moonTableEls = this.moonTable.querySelectorAll('tbody td')
        moonTableEls[0].innerHTML = ephemeris.moon.position.shapeDirectionString
        moonTableEls[1].innerHTML = ephemeris.moon.position.shapeString
        moonTableEls[2].innerHTML = ephemeris.moon.position.quarterApproximationDirectionString
        moonTableEls[3].innerHTML = ephemeris.moon.position.quarterApproximationString || `${ephemeris.moon.position.shapeDirectionString} ${ephemeris.moon.position.shapeString}`
        moonTableEls[4].innerHTML = ephemeris.moon.position.illuminatedFraction
        moonTableEls[5].innerHTML = ephemeris.moon.position.phaseDecimal
        const moonOrbitTableEls = this.moonOrbitTable.querySelectorAll('tbody td')
        moonOrbitTableEls[0].innerHTML = ephemeris.moon.orbit.meanAscendingNode.apparentLongitude
        moonOrbitTableEls[1].innerHTML = ephemeris.moon.orbit.meanDescendingNode.apparentLongitude
        moonOrbitTableEls[2].innerHTML = ephemeris.moon.orbit.meanPerigee.apparentLongitude
        moonOrbitTableEls[3].innerHTML = ephemeris.moon.orbit.meanApogee.apparentLongitude
    }

    displayvalues(ephemeris, showShadows) {
        var _valu =  ephemeris.Observer.year + "/" + (ephemeris.Observer.month+1) + "/" + ephemeris.Observer.day +  ",";
        ephemeris.Results.forEach(result => {
            var R = (result.motion.isRetrograde ? '-R' : '');
            if (showShadows && (R=="-R")) {
                if (result.motion.withinPreRetrogradeShadow) {
                    R = R + '1';
                }
                if (result.motion.withinPostRetrogradeShadow) {
                    R = R + '2';
                }
            }
            _valu += result.key + R + "," + ((result.type == "heliocentric" || result.type == "sun") ? result.position.constellation : "") + "," + result.position.apparentLongitude.toFixed(4) + "," + result.position.apparentLongitudeString + ",";
        });
        var moon = "(" + ephemeris.moon.position.shapeDirectionString + "," + ephemeris.moon.position.shapeString + "," + ephemeris.moon.position.quarterApproximationDirectionString + "," + (ephemeris.moon.position.quarterApproximationString || '${ephemeris.moon.position.shapeDirectionString} ${ephemeris.moon.position.shapeString}') + "," + ephemeris.moon.position.illuminatedFraction + "," + ephemeris.moon.position.phaseDecimal + "," + ephemeris.moon.orbit.meanAscendingNode.apparentLongitude + "," + ephemeris.moon.orbit.meanDescendingNode.apparentLongitude + "," + ephemeris.moon.orbit.meanPerigee.apparentLongitude + "," + ephemeris.moon.orbit.meanApogee.apparentLongitude + ")";
        _valu += moon;
    }
}