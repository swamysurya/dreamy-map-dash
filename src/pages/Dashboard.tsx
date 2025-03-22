
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useLocationStore } from '../store/locationStore';
import LocationCard from '../components/LocationCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Map, Info, MapPin } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { 
    locations, 
    isLoading, 
    fetchLocations, 
    filterLocationsByRegion 
  } = useLocationStore();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Fetch locations using our new store
    fetchLocations();
  }, [fetchLocations]);

  // Get filtered locations based on active tab
  const filteredLocations = filterLocationsByRegion(activeTab as 'all' | 'north' | 'south');

  return (
    <div className="min-h-screen pt-16 pb-12 animated-background">
      <div className="container px-4 mx-auto">
        {/* Header Section */}
        <div className="py-8 mb-4 text-center sm:text-left">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
            Dashboard
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.username || 'Explorer'}</h1>
          <p className="text-gray-600 max-w-2xl">
            Explore India's most fascinating locations. Select any card to view detailed 
            location information on the interactive map.
          </p>
        </div>

        {/* Tabs & Filters */}
        <Tabs 
          defaultValue="all" 
          className="mb-8"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList className="glass">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Map className="h-4 w-4" />
                <span>All Locations</span>
              </TabsTrigger>
              <TabsTrigger value="north" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>North India</span>
              </TabsTrigger>
              <TabsTrigger value="south" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>South India</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* All locations tab */}
          <TabsContent value="all" className="mt-0 animate-fade-in">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glass rounded-lg h-72 animate-pulse-slow"></div>
                ))}
              </div>
            ) : filteredLocations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLocations.map(location => (
                  <LocationCard key={location.id} {...location} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">No locations found</h3>
                <p className="text-gray-500">Try changing your filter criteria</p>
              </div>
            )}
          </TabsContent>
          
          {/* North India tab */}
          <TabsContent value="north" className="mt-0 animate-fade-in">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="glass rounded-lg h-72 animate-pulse-slow"></div>
                ))}
              </div>
            ) : filteredLocations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLocations.map(location => (
                  <LocationCard key={location.id} {...location} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">No locations in North India</h3>
                <p className="text-gray-500">Try another region</p>
              </div>
            )}
          </TabsContent>
          
          {/* South India tab */}
          <TabsContent value="south" className="mt-0 animate-fade-in">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="glass rounded-lg h-72 animate-pulse-slow"></div>
                ))}
              </div>
            ) : filteredLocations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLocations.map(location => (
                  <LocationCard key={location.id} {...location} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">No locations in South India</h3>
                <p className="text-gray-500">Try another region</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="mt-12 p-6 glass rounded-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">How to use the dashboard</h3>
              <p className="text-gray-600 text-sm">
                Click on any location card to view it on an interactive map. You can 
                filter locations by region using the tabs above. The map view provides 
                detailed information and allows you to explore the surroundings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
