(ns webapp.plant)

(defrecord Plant 
  [plant-id
   species
   colloquial-name
   nickname
   watering-schedule-id
   light-needs
   feeding-schedule-id
   ph-needs
   help-url
   notes
   ])

(defrecord PlantEntry
  [plant-id
   species
   colloquial-name
   nickname])

(defn get-plant-entry-from-obj [plant-obj]
  (PlantEntry.
   (get plant-obj "plant_id")
   (get plant-obj "species")
   (get plant-obj "colloquial_name")
   (get plant-obj "nickname")))
