backend api queries

GET /api/health
GET /api/game/:id

# get field lists
GET /api/place
# get field info (cr,slope etc)
GET /api/place/:place_id



component example
------------------------------------
<PlaceSelect
          className="mr"
          onValueChanged={place_changed}
          callbacktag="place_id" #this one used in callback parameter change
          recalc="1" # use 1 here cause recalc page
        />


                  

