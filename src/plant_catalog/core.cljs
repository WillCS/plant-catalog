(ns plant-catalog.core
  (:require ["express" :as express]
            [reagent.dom.server :as reagent-server]))

(defonce server (atom nil))

(defn simple-component []
  [:div
   [:p "Here's some text"]
   [:p.testclass
    "Here's some more text. " [:string "it's bold."]
    [:span {:style {:color "red"}} " and red text"] " normal here though."]])

(defn render-component []
  (reagent-server/render-to-string(simple-component)))

(defn routes [^js app]
  (.get app "/" (fn [req res] (.send res (render-component)))))

(defn start-server []
  (let [app (express)
        prod? (= (.get app "env") "production")
        port (if (nil? (.-PORT (.-env js/process)))
               3000
               (int (.-PORT (.-env js/process))))]
    (when prod? (.set app "trust proxy" 1))
    (.use app "/assets" (.static express "assets"))
    (routes app)
    (.listen app port (fn [] (prn "Listening")))))

(defn start! []
  (reset! server (start-server)))

(defn stop! []
  (.close @server)
  (reset! server nil))

(defn main [& args]
  (start!))
