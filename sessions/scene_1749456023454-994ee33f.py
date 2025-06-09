from manimlib import *

class GoogleLogo(Scene):
    def construct(self):
        # Define colors for the Google logo
        blue = '#4285F4'
        red = '#EA4335'
        yellow = '#FBBC05'
        green = '#34A853'

        # Create the 'G' shape
        g_arc_red = Arc(
            start_angle=PI/2 + PI/10,  # Slightly past top
            angle=PI - PI/5,        # Goes down to the bottom
            radius=2,
            color=red,
            arc_center=ORIGIN
        )

        g_arc_blue = Arc(
            start_angle=PI/2 - PI/10, # Slightly past top
            angle=PI - PI/5,       # Goes down to the bottom
            radius=2,
            color=blue,
            arc_center=ORIGIN
        )

        g_left_curve = ArcBetweenPoints(
            g_arc_blue.points[-1],  # End of blue arc
            g_arc_red.points[0],   # Start of red arc
            angle=PI/2,             # Curve inward
            color=blue
        )
        g_right_curve = ArcBetweenPoints(
            g_arc_red.points[-1],  # End of red arc
            g_arc_blue.points[0],  # Start of blue arc
            angle=-PI/2,            # Curve inward
            color=red
        )

        g_inner_hole = Circle(radius=0.9, color=BLACK, fill_opacity=1)
        g_outer_shape = VMobject()
        g_outer_shape.set_points_as_corners([
            g_arc_blue.points[-1],  # End of blue arc
            g_left_curve.points[0],
            *g_left_curve.points,
            g_left_curve.points[-1], # Start of red arc
            *g_arc_red.points,
            *g_right_curve.points,
            g_right_curve.points[0],  # Start of blue arc
        ])
        g_outer_shape = VGroup(g_arc_blue, g_left_curve, g_arc_red, g_right_curve)
        g_outer_shape.set_stroke(width=0)
        g_outer_shape.set_fill(color=blue, opacity=1) # Initial fill for G

        # The 'G' shape is not a simple arc; it's a specific "Pac-Man" with a cutout.
        # Let's try to build it segment by segment for accuracy.
        # Outer arc
        g_outer_arc = Arc(radius=2, start_angle=1.2*PI, angle=-2*PI*0.75, color=blue)
        # Inner arc
        g_inner_arc = Arc(radius=0.9, start_angle=1.2*PI, angle=-2*PI*0.75, color=BLACK, fill_opacity=1)

        # The connecting segments
        g_top_connect = Line(g_outer_arc.points[0], g_inner_arc.points[0], color=blue)
        g_bottom_connect = Line(g_outer_arc.points[-1], g_inner_arc.points[-1], color=blue)

        # The 'tail' of the G
        g_tail_width = 0.8
        g_tail_height = 0.8
        g_tail_pos = 0.8  # Where the tail starts on the right side

        # Points for the tail (more complex shape)
        # Approximating the G using Polygon for simplicity or more precise arcs
        # Let's approximate it with a combination of arcs and lines.

        # Core G shape (large arc, part of a circle)
        g_main_arc = Arc(radius=2.5, start_angle=PI/2 + 0.3, angle=2*PI - 0.6, color=blue, stroke_width=0)
        g_main_arc_fill = g_main_arc.copy().set_fill(blue, opacity=1)

        g_cutout = Circle(radius=1.1, color=BLACK, fill_opacity=1).move_to(ORIGIN)

        # Create the 'mouth' or cutout for 'G'
        g_mouth_points = [
            2*RIGHT + 1*UP,
            1.5*RIGHT + 0.5*UP,
            1.5 * RIGHT - 0.5 * UP,
            2 * RIGHT - 1 * UP,
            2.5 * RIGHT - 0.2 * UP, # Tail end point
            2.5 * RIGHT + 0.2 * UP, # Tail other end point
        ]
        g_mouth_shape = Polygon(
            RIGHT*2.5,
            RIGHT*1.2 + UP*1.2,
            RIGHT*1.2 + DOWN*1.2,
            RIGHT*2.5,
            color=BLACK, fill_opacity=1, stroke_width=0
        )
        g_rect_tail = Rectangle(width=1.5, height=0.5, color=red, fill_opacity=1).move_to(RIGHT*1.75 + DOWN*0.8)
        g_rect_tail.align_to(g_main_arc.get_right(), LEFT)

        # Let's try a more programmatic approach to the G shape using union/difference
        g_full_circle = Circle(radius=2.0, color=blue, fill_opacity=1)
        g_inner_circle = Circle(radius=0.9, color=BLACK, fill_opacity=1)

        # Create a "cutout" for the right side of the G
        g_block_cutout = Rectangle(width=2.5, height=2, color=BLACK, fill_opacity=1)
        g_block_cutout.set_x(g_full_circle.get_right()[0] - 0.5)

        g_shape = Difference(g_full_circle, g_inner_circle)
        g_shape = Difference(g_shape, g_block_cutout)

        # Add the red/yellow/green tail to the G
        g_tail_red = Rectangle(width=1.2, height=0.8, color=red, fill_opacity=1)
        g_tail_red.rotate(PI/10).next_to(g_shape, RIGHT, buff=0.0).shift(DOWN*0.5)
        g_tail_red.align_to(g_shape, LEFT)


        # Better G shape construction
        google_g = SVGMobject("Google_G_logo.svg") # Assuming you have this SVG
        google_g.set_height(3)
        self.add(google_g)
        self.wait(1)
        self.remove(google_g)

        # Manually constructing the G (more challenging but good for learning)
        g_outer_circle = Annulus(inner_radius=0.9, outer_radius=2.0, color=blue, fill_opacity=1)
        g_outer_circle.set_stroke(width=0)

        # Create the 'mouth' of the G
        mouth_path = VMobject()
        mouth_path.set_points_as_corners([
            2.0 * RIGHT + 0.5 * UP,
            0.9 * RIGHT + 0.5 * UP,
            0.9 * RIGHT - 0.5 * UP,
            2.0 * RIGHT - 0.5 * UP,
            2.0 * RIGHT + 0.5 * UP,
        ])
        g_mouth = Polygon(*mouth_path.get_points(), color=BLACK, fill_opacity=1, stroke_width=0)
        # g_mouth = mouth_path.copy().set_fill(BLACK, opacity=1).set_stroke(width=0)

        google_g_shape = Difference(g_outer_circle, g_mouth)

        # Slice for colors
        g_slice_red_shape = Annulus(inner_radius=0.9, outer_radius=2.0, arc_angle=PI/4, start_angle=0.1, color=red, fill_opacity=1)
        g_slice_yellow_shape = Annulus(inner_radius=0.9, outer_radius=2.0, arc_angle=PI/4, start_angle=0.1 + PI/4, color=yellow, fill_opacity=1)
        g_slice_green_shape = Annulus(inner_radius=0.9, outer_radius=2.0, arc_angle=PI/4, start_angle=0.1 + PI/2, color=green, fill_opacity=1)

        g_tail_red = Polygon(
            google_g_shape.get_right() + UP*0.5,
            google_g_shape.get_right() + DOWN*0.5,
            google_g_shape.get_right() + DOWN*0.5 + RIGHT*0.8,
            google_g_shape.get_right() + UP*0.5 + RIGHT*0.8,
            color=red, fill_opacity=1
        ) # This is a simple rectangle for the tail, not accurate.


        # For the real Google G, it's easier to create the whole letter and then color by segments
        # Let's make a blue G first
        g_base_arc = Arc(
            radius=2.0,
            start_angle=PI*0.75,
            angle=2*PI - 0.5, # Slightly less than full circle
            color=blue
        )

        g_inner_arc = Arc(
            radius=0.9,
            start_angle=PI*0.75,
            angle=2*PI - 0.5,
            color=BLACK
        )

        # Connect the start and end points of the arcs to form the shape
        g_path = VMobject()
        g_path.set_points_as_corners([
            *g_base_arc.points,
            g_inner_arc.points[-1],
            *g_inner_arc.points[::-1], # Reverse for going back
            g_base_arc.points[0]
        ])
        g_path = g_path.set_fill(blue, opacity=1).set_stroke(width=0)

        # Create the 'mouth' (pacman style)
        mouth_rect = Rectangle(width=1.5, height=1.0, color=BLACK, fill_opacity=1)
        mouth_rect.shift(RIGHT * 1.0) # Position to cut out the right side

        g_letter = Difference(g_path, mouth_rect).shift(LEFT * 4)

        # Now color the 'tail' part as red, yellow, green
        # This requires manually creating parts or using boolean operations
        # A simpler approach: create colored segments and position them
        g_red_segment = Rectangle(width=1.2, height=0.6, color=red, fill_opacity=1)
        g_yellow_segment = Rectangle(width=0.8, height=0.6, color=yellow, fill_opacity=1)
        g_green_segment = Rectangle(width=1.2, height=0.6, color=green, fill_opacity=1)

        g_red_segment.next_to(g_letter, RIGHT, buff=-1.7).shift(DOWN*0.6)
        g_red_segment.rotate(PI/12)

        g = VGroup(g_letter, g_red_segment) # This is a simplified G.

        # The actual Google G has a more specific shape for the colored part.
        g_shape_accurate = Annulus(inner_radius=0.9, outer_radius=2.0)
        g_shape_accurate.set_fill(blue, opacity=1).set_stroke(width=0)
        
        # Create the cut-out for the G
        g_cut_polygon = Polygon(
            RIGHT * 2, UP * 0.8,
            RIGHT * 1.5, UP * 0.8,
            RIGHT * 1.5, DOWN * 0.8,
            RIGHT * 2, DOWN * 0.8,
            color=BLACK, fill_opacity=1, stroke_width=0
        ).shift(RIGHT*0.1) # Shift slightly for positioning

        g_cut_curve_top = Arc(radius=0.9, start_angle=0.2, angle=0.8, color=BLACK)
        g_cut_curve_bottom = Arc(radius=0.9, start_angle=-0.2, angle=-0.8, color=BLACK)
        
        # Combined shape and cutout
        # It's better to use an SVG for the exact 'G' shape for precision.
        # If not using SVG, use Difference for the inner circle, and then for the mouth.
        
        # For demonstration purposes, let's create a simplified 'G' with color segments
        
        # The main blue arc of G
        g_blue_arc = Arc(
            radius=2.0,
            start_angle=PI * (3/4) + 0.1,
            angle=(2*PI * 0.6), # Roughly 3/5 of the circle
            color=blue,
            stroke_width=5 # Using stroke for shape definition
        )

        # Inner cut for the G
        g_inner_cut = Circle(radius=0.9, color=BLACK, fill_opacity=1)

        # The 'mouth' or horizontal cutout
        g_mouth_cut = Rectangle(width=1.5, height=1.0, color=BLACK, fill_opacity=1).move_to(RIGHT * 0.8)

        # Approximate G shape
        g_approx = Difference(Annulus(inner_radius=0.9, outer_radius=2.0, color=blue, fill_opacity=1), g_mouth_cut)
        
        # Tail parts (simplified as rectangles for now)
        g_tail_red = Rectangle(width=1.2, height=0.6, color=red, fill_opacity=1)
        g_tail_yellow = Rectangle(width=0.8, height=0.6, color=yellow, fill_opacity=1)
        g_tail_green = Rectangle(width=1.2, height=0.6, color=green, fill_opacity=1)

        # Positioning these manually is tricky for the exact Google G
        # Let's focus on the overall logo structure.
        
        # Re-attempt G with accurate colors and shape if not using SVG
        # This is where the complexity lies for a perfect G.
        
        # Let's create the letters first
        letter_g = Text("G", font="Google Sans", color=blue).scale(4).shift(LEFT*3.5)
        letter_o1 = Text("o", font="Google Sans", color=red).scale(4).next_to(letter_g, RIGHT, buff=0.1)
        letter_o2 = Text("o", font="Google Sans", color=yellow).scale(4).next_to(letter_o1, RIGHT, buff=0.1)
        letter_g2 = Text("g", font="Google Sans", color=blue).scale(4).next_to(letter_o2, RIGHT, buff=0.1)
        letter_l = Text("l", font="Google Sans", color=green).scale(4).next_to(letter_g2, RIGHT, buff=0.1)
        letter_e = Text("e", font="Google Sans", color=red).scale(4).next_to(letter_l, RIGHT, buff=0.1)

        # This will render the text. But the prompt is for the logo, which includes the distinct 'G' shape.

        # Let's create the 'G' using segments
        g_main_blue_outer = Arc(radius=2, start_angle=PI/2 + 0.3, angle=2*PI - 0.6, color=blue, stroke_width=0)
        g_main_blue_inner = Arc(radius=0.9, start_angle=PI/2 + 0.3, angle=2*PI - 0.6, color=BLACK, stroke_width=0)
        
        # Fill the annulus (donut shape)
        g_base_shape = Difference(
            Circle(radius=2, color=blue, fill_opacity=1),
            Circle(radius=0.9, color=BLACK, fill_opacity=1)
        )
        
        # Create the 'mouth' cutout
        g_mouth_cutout = Rectangle(width=1.5, height=1.0, color=BLACK, fill_opacity=1).move_to(RIGHT * 0.8)
        
        g_part_blue = Difference(g_base_shape, g_mouth_cutout)

        # The colored 'tail' of the G (this part is tricky to get right
        # with simple shapes, usually done with paths or boolean ops)
        # Using a polygon to approximate the red/yellow/green section
        g_tail_path = VMobject()
        g_tail_path.set_points_as_corners([
            RIGHT * 1.5 + DOWN * 0.2,   # Inner top right point
            RIGHT * 2.0 + DOWN * 0.2,   # Outer top right point
            RIGHT * 2.0 + UP * 0.2,     # Transition point for red
            # This is not exact for the real logo.
        ])

        # For the precise Google G, an SVG is the best approach.
        # Assuming we can't use an SVG directly unless loaded from a file
        # and the problem wants it drawn programmatically:

        # Let's create a simplified 'G' where the colors are distinct
        g_shape = Annulus(inner_radius=0.9, outer_radius=2, color=blue, fill_opacity=1)
        g_mouth_cut_simplified = Rectangle(width=1.5, height=1.5, color=BLACK, fill_opacity=1).move_to(RIGHT*0.75)
        g_final = Difference(g_shape, g_mouth_cut_simplified)

        # For the colored part
        # Red part:
        red_piece = Rectangle(width=1.3, height=0.6, color=red, fill_opacity=1)
        red_piece.shift(RIGHT * 1.25 + DOWN * 0.8).rotate(PI/12)

        # Yellow part (wedge)
        yellow_piece = Polygon(
            ORIGIN, 
            3*RIGHT + 0.5*UP,
            3*RIGHT - 0.5*UP,
            color=yellow, fill_opacity=1, stroke_width=0
        )
        # This is not how Google's G is colored.

        # Let's use the actual Google color breakdown for the G:
        # A mostly blue circle, with a red/yellow/green segment on the bottom right.
        
        # Main G circle piece (blue)
        g_blue_segment = Annulus(inner_radius=0.9, outer_radius=2,
                                  start_angle=PI*0.8, arc_angle=2*PI*0.7,
                                  color=blue, fill_opacity=1)
        
        # Red segment
        g_red_segment = Annulus(inner_radius=0.9, outer_radius=2,
                                start_angle=PI*0.8 + 2*PI*0.7, arc_angle=2*PI*0.1,
                                color=red, fill_opacity=1)
        
        # Yellow segment
        g_yellow_segment = Annulus(inner_radius=0.9, outer_radius=2,
                                   start_angle=PI*0.8 + 2*PI*0.7 + 2*PI*0.1, arc_angle=2*PI*0.1,
                                   color=yellow, fill_opacity=1)
        
        # Green segment (the remaining 0.1 of circle)
        g_green_segment = Annulus(inner_radius=0.9, outer_radius=2,
                                  start_angle=PI*0.8 + 2*PI*0.7 + 2*PI*0.1 + 2*PI*0.1, arc_angle=2*PI*0.1,
                                  color=green, fill_opacity=1)
        
        # Combine the segments to form the full annulus
        g_annulus = VGroup(g_blue_segment, g_red_segment, g_yellow_segment, g_green_segment)

        # Now create the 'mouth' cutout
        g_mouth_cutout_exact = Polygon(
            RIGHT * 2, UP * 0.9,
            RIGHT * 0.9, UP * 0.9,
            RIGHT * 0.9, DOWN * 0.9,
            RIGHT * 2, DOWN * 0.9,
            color=BLACK, fill_opacity=1
        )
        
        # Create Google's 'G' logo
        google_g_logo = Difference(g_annulus, g_mouth_cutout_exact).shift(LEFT * 4.5)

        # Define the remaining letters
        o1 = Text("o", font="Google Sans", color=red)
        o2 = Text("o", font="Google Sans", color=yellow)
        g_text = Text("g", font="Google Sans", color=blue)
        l = Text("l", font="Google Sans", color=green)
        e = Text("e", font="Google Sans", color=red)

        # Set scale for letters
        letter_scale = google_g_logo.get_height() / 4.0 # Match G height roughly
        
        o1.set_height(letter_scale * 0.8) # Adjust height for 'o'
        o2.set_height(letter_scale * 0.8)
        g_text.set_height(letter_scale)
        l.set_height(letter_scale)
        e.set_height(letter_scale * 0.8)

        # Arrange letters horizontally
        o1.next_to(google_g_logo, RIGHT, buff=0.1)
        o2.next_to(o1, RIGHT, buff=0.1)
        text_g = g_text.next_to(o2, RIGHT, buff=0.1) # Renamed to avoid conflict
        l.next_to(text_g, RIGHT, buff=0.1)
        e.next_to(l, RIGHT, buff=0.1)

        # Group all elements
        google_logo_group = VGroup(
            google_g_logo,
            o1, o2, text_g, l, e
        ).center() # Center the whole logo

        # Play animation
        self.play(FadeIn(google_logo_group), run_time=2)
        self.wait(1)
