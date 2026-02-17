npm install -g

# Display data for all countries.
corona

# Display data for all countries in single color.
corona --xcolor

# Display data for given country i.e. China.
corona china

# Display data for all the US states.
corona states

# Display states data sorted by active cases.
corona states --sort active

# Display states data sorted by Cases today.
corona states -s cases-today

# Sort data by type
corona --sort country
corona --s cases

# All sorting parameters.
corona -s country
corona -s cases
corona -s cases-today
corona -s deaths
corona -s deaths-today
corona -s recovered
corona -s active
corona -s critical
corona -s per-million

# Reverse sort data
corona --sort active --reverse

# Print bar charts for max 10 countries.
timeout 10s corona --bar

# Print bar charts for top 5 countries w.r.t deaths.
timeout 10s corona --bar --sort deaths --limit 5

# Print bar charts countries w.r.t recovered cases.
timeout 10s corona --bar --sort recovered

# Print a country line chart.
timeout 10s corona usa --chart

# Print a country line chart with logarithmic data.
timeout 10s corona china --chart --log

# Print a limited number of entries to the output.
timeout 10s corona --limit 10


# Print a bare bones table with no info.
timeout 10s corona --minimal

# Display the help data.
corona help
