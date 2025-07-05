import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter, Star, Clock } from "lucide-react";
import cinemaHeroBg from "@/assets/cinema-hero-bg.jpg";
import theaterSeatsBg from "@/assets/theater-seats-bg.jpg";
import movieNeonDreams from "@/assets/movie-neon-dreams.jpg";
import movieShadowRealm from "@/assets/movie-shadow-realm.jpg";
import movieQuantumStrike from "@/assets/movie-quantum-strike.jpg";
import movieStarlightRomance from "@/assets/movie-starlight-romance.jpg";
import CinematicHero from "@/components/CinematicHero";
import CinematicBackground from "@/components/CinematicBackground";
import CinematicLoader from "@/components/CinematicLoader";

const movies = [
	{
		id: "neon-dreams",
		title: "Neon Dreams",
		poster: movieNeonDreams,
		genre: "Sci-Fi Thriller",
		rating: "4.8",
		duration: "2h 15m",
		language: "English",
		format: "2D/3D/IMAX",
	},
	{
		id: "shadow-realm",
		title: "Shadow Realm",
		poster: movieShadowRealm,
		genre: "Dark Fantasy",
		rating: "4.6",
		duration: "1h 58m",
		language: "English",
		format: "2D/3D",
	},
	{
		id: "quantum-strike",
		title: "Quantum Strike",
		poster: movieQuantumStrike,
		genre: "Action",
		rating: "4.7",
		duration: "2h 8m",
		language: "English",
		format: "2D/4DX",
	},
	{
		id: "starlight-romance",
		title: "Starlight Romance",
		poster: movieStarlightRomance,
		genre: "Romance",
		rating: "4.5",
		duration: "1h 52m",
		language: "English",
		format: "2D",
	},
];

const genres = ["All", "Action", "Sci-Fi Thriller", "Dark Fantasy", "Romance"];
const languages = ["All", "English", "Spanish", "French"];
const formats = ["All", "2D", "3D", "IMAX", "4DX"];

const Index = () => {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [selectedGenre, setSelectedGenre] = useState("All");
	const [selectedLanguage, setSelectedLanguage] = useState("All");
	const [selectedFormat, setSelectedFormat] = useState("All");

	const filteredMovies = movies.filter((movie) => {
		const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
		const matchesLanguage = selectedLanguage === "All" || movie.language === selectedLanguage;
		const matchesFormat = selectedFormat === "All" || movie.format.includes(selectedFormat);

		return matchesSearch && matchesGenre && matchesLanguage && matchesFormat;
	});	return (
		<div className="min-h-screen relative">			{/* Cinema hall background for the entire page */}
			<div 
				className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
				style={{
					backgroundImage: `url(${theaterSeatsBg})`,
					filter: 'blur(1px) grayscale(10%)',
					opacity: 0.5
				}}
			></div>
			
			{/* Cinematic gradient overlay */}
			<div className="fixed inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 z-0"></div>
			
			{/* Content wrapper */}
			<div className="relative z-10">
				{/* Hero Section */}
				<CinematicHero
					title="TAP2SEAT"
					subtitle="Experience Cinema Like Never Before"
					description="Book your perfect movie experience with premium seating, gourmet snacks, and immersive entertainment"
					featuredMovie={{
						title: "Neon Dreams",
					genre: "Sci-Fi Thriller",
					rating: "4.8",
					poster: movieNeonDreams
				}}
			/>			{/* Filters Section */}
			<section className="py-6 sm:py-8 bg-card/50 backdrop-blur-md relative">
				<CinematicBackground variant="subtle" />
				<div className="absolute top-0 left-0 right-0 h-px bg-muted/20"></div>
				<div className="absolute bottom-0 left-0 right-0 h-px bg-muted/20"></div>
				<div className="container mx-auto px-4 sm:px-6 md:px-8">
					<div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">
						<div className="flex items-center gap-2 text-primary-glow">
							<Filter className="w-4 h-4 sm:w-5 sm:h-5" />
							<span className="font-medium text-sm sm:text-base">Filters:</span>
						</div>

						{/* Search Bar */}
						<div className="relative flex-1 w-full sm:max-w-md">
							<Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
							<Input
								placeholder="Search movies..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9 sm:pl-10 h-9 sm:h-10 glass-card focus:neon-glow transition-all duration-300 text-sm sm:text-base"
							/>
						</div>

						<Select value={selectedGenre} onValueChange={setSelectedGenre}>
							<SelectTrigger className="w-40 glass-card">
								<SelectValue placeholder="Genre" />
							</SelectTrigger>
							<SelectContent>
								{genres.map((genre) => (
									<SelectItem key={genre} value={genre}>
										{genre}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
							<SelectTrigger className="w-40 glass-card">
								<SelectValue placeholder="Language" />
							</SelectTrigger>
							<SelectContent>
								{languages.map((lang) => (
									<SelectItem key={lang} value={lang}>
										{lang}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select value={selectedFormat} onValueChange={setSelectedFormat}>
							<SelectTrigger className="w-40 glass-card">
								<SelectValue placeholder="Format" />
							</SelectTrigger>
							<SelectContent>
								{formats.map((format) => (
									<SelectItem key={format} value={format}>
										{format}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Button
							variant="outline"
							onClick={() => {
								setSelectedGenre("All");
								setSelectedLanguage("All");
								setSelectedFormat("All");
								setSearchTerm("");
							}}
						>
							Clear Filters
						</Button>
					</div>
				</div>
			</section>

			{/* Movies Section */}
			<section className="py-16">
				<div className="container mx-auto px-8">					<div className="mb-12">
						<h2 className="font-cinematic text-4xl font-bold mb-4 text-center text-primary-glow neon-text">
							Now Showing
						</h2>
						<p className="text-center text-muted-foreground text-lg">
							Discover the latest blockbusters and exclusive premieres
						</p>
					</div>

					{filteredMovies.length === 0 ? (
						<div className="text-center py-16">
							<p className="text-muted-foreground text-xl">
								No movies match your current filters
							</p>
							<Button
								variant="cinema"
								className="mt-4"
								onClick={() => {
									setSelectedGenre("All");
									setSelectedLanguage("All");
									setSelectedFormat("All");
									setSearchTerm("");
								}}
							>
								Show All Movies
							</Button>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{filteredMovies.map((movie) => (
								<Card
									key={movie.id}
									className="glass-card group cursor-pointer transition-all duration-500 hover:neon-glow hover:scale-105"
									onClick={() => navigate(`/movie/${movie.id}`)}
								>
									<div className="relative overflow-hidden rounded-t-lg">
										<img
											src={movie.poster}
											alt={movie.title}
											className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										<div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<Button variant="cinema" size="sm" className="w-full neon-glow">
												Book Tickets
											</Button>
										</div>
									</div>

									<CardContent className="p-6">
										<h3 className="font-cinematic text-xl font-bold mb-2 text-primary-glow group-hover:text-accent-glow transition-colors">
											{movie.title}
										</h3>

										<div className="space-y-3">
											<Badge variant="secondary" className="bg-secondary/20">
												{movie.genre}
											</Badge>

											<div className="flex items-center justify-between text-sm text-muted-foreground">
												<div className="flex items-center gap-1">
													<Star className="w-4 h-4 fill-accent text-accent" />
													<span className="font-medium">{movie.rating}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="w-4 h-4" />
													<span>{movie.duration}</span>
												</div>
											</div>

											<div className="text-sm">
												<div className="text-muted-foreground">Available in:</div>
												<div className="font-medium text-primary-glow">
													{movie.format}
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</div>
			</section>			{/* Footer */}
			<footer className="bg-card-glass py-12 relative">
				<div className="absolute top-0 left-0 right-0 h-px bg-muted/20"></div><div className="container mx-auto px-8 text-center">
					<div className="font-cinematic text-3xl font-bold mb-4 text-primary-glow neon-text">
						TAP2SEAT
					</div>
					<p className="text-muted-foreground mb-6">
						Your premium cinema booking experience
					</p>
					<div className="flex justify-center gap-8 text-sm text-muted-foreground">
						<a
							href="#"
							className="hover:text-primary-glow transition-colors"
						>
							About Us
						</a>
						<a
							href="#"
							className="hover:text-primary-glow transition-colors"
						>
							Support
						</a>
						<a
							href="#"
							className="hover:text-primary-glow transition-colors"
						>
							Terms
						</a>
						<a
							href="#"
							className="hover:text-primary-glow transition-colors"
						>
							Privacy
						</a>
					</div>				</div>
			</footer>
			</div>
		</div>
	);
};

export default Index;