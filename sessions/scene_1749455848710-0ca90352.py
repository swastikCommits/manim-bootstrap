from manim import *

class GoogleLogo(Scene):
    def construct(self):
        # Define colors for Google logo
        blue = '#4285F4'
        red = '#EA4335'
        yellow = '#FBBC05'
        green = '#34A853'

        # Create the 'G'
        g = Group()
        # Main circle for 'G'
        g_main_circle = Circle(radius=1.5, color=blue, fill_opacity=1)
        # Cutout for 'G'
        g_cutout = Circle(radius=1, color=BLACK, fill_opacity=1).move_to(g_main_circle.get_center() + 0.3 * UR)
        # Blue top part of 'G'
        g_top = Polygon(
            g_main_circle.get_start_point() + 0.3 * UP,  # Roughly top left of circle
            g_main_circle.get_center() + 0.3 * UR,
            g_main_circle.get_center() + 0.3 * RIGHT,
            g_main_circle.get_center() + 0.3 * DR,
            g_main_circle.get_bottom_point() + 0.3 * DOWN,
            color=blue, fill_opacity=1
        )
        g_top.points[0] = g_main_circle.points[0] # Ensure it aligns with the circle segment

        g_cut_shape = Rectangle(width=2, height=1.5, color=BLACK, fill_opacity=1).next_to(g_main_circle, RIGHT, buff=-1.5)
        g_cut_shape.shift(0.3 * UP + 0.2 * LEFT)
        
        # Combine shapes to form the 'G' (approximated)
        g.add(g_main_circle)
        g.add(g_cutout)
        
        # This is a bit tricky to get a perfect G using simple shapes.
        # A better approach would be using `Difference` or `Intersection` with SVG.
        # For demonstration, we'll use a Union and a cutout.
        
        # Let's simplify and use a text G
        g_text_obj = Text("G", font_size=5, color=blue, weight=BOLD)
        
        # Create other letters
        o1 = Circle(radius=0.7, color=red, fill_opacity=1)
        o2 = Circle(radius=0.7, color=yellow, fill_opacity=1)
        g_o_center = Circle(radius=0.3, color=BLACK, fill_opacity=1) # Inner cutout

        o1_final = Difference(o1.copy(), g_o_center.copy().move_to(o1.get_center()))
        o2_final = Difference(o2.copy(), g_o_center.copy().move_to(o2.get_center()))

        # For the 'g' itself (using path/svg for accuracy is best)
        # Simulating the 'G' with arc and rectangle
        g_outer_arc = Arc(radius=1.5, start_angle=PI/2, end_angle=2*PI+PI/2, color=blue)
        g_inner_arc = Arc(radius=1, start_angle=PI/2, end_angle=2*PI+PI/2, color=blue) # For internal cut
        
        g_shape_part = VGroup()
        # Outer blue part
        g_outer_part = Difference(
            Circle(radius=1.5, color=blue, fill_opacity=1),
            Circle(radius=1, color=BLACK, fill_opacity=1).shift(0.3 * UR) # Cutout for the G hole
        )
        # Red bar extending from G
        g_red_bar = Rectangle(width=1.5, height=0.7, color=red, fill_opacity=1).move_to(g_outer_part.get_center() + 0.7 * RIGHT)
        # Cut part of the red bar to fit the G
        g_red_bar.stretch_to_fit_height(g_outer_part.get_height() / 2) # Adjust height
        g_red_bar.align_to(g_outer_part, RIGHT).shift(0.1*LEFT + 0.1*DOWN)
        
        # This approach for G is very difficult with primitives.
        # Let's use `Text` as a simpler approximation for the letters.
        g_letter = Text("G", font_size=3.5, color=blue, weight=BOLD).scale(1.5)
        o_letter = Text("o", font_size=3.5, color=red)
        o_letter_2 = Text("o", font_size=3.5, color=yellow)
        g_letter_2 = Text("g", font_size=3.5, color=green) # lowercase g for green
        l_letter = Text("l", font_size=3.5, color=blue)
        e_letter = Text("e", font_size=3.5, color=red)

        # Arrange letters
        g_letter.shift(LEFT * 5.5)
        o_letter.next_to(g_letter, RIGHT, buff=0.2)
        o_letter_2.next_to(o_letter, RIGHT, buff=0.2)
        g_letter_2.next_to(o_letter_2, RIGHT, buff=0.2)
        l_letter.next_to(g_letter_2, RIGHT, buff=0.2)
        e_letter.next_to(l_letter, RIGHT, buff=0.2)

        # Apply specific colors to letters based on the prompt
        o_letter_orig = o_letter.copy().set_color(red)
        o_letter_2_orig = o_letter_2.copy().set_color(yellow)
        l_letter_orig = l_letter.copy().set_color(blue)
        e_letter_orig = e_letter.copy().set_color(red)

        # For the 'G', render a custom shape
        # This is closer to the actual Google G
        G_shape = VGroup()
        # Outer circle part
        g_outer_circle = Arc(radius=1.5, start_angle=DEGREES(90), end_angle=DEGREES(-225), color=blue)
        # Inner circle cut out (approx)
        g_inner_circle_cut = Arc(radius=1, start_angle=DEGREES(90), end_angle=DEGREES(270), color=blue)
        
        # The crossbar for the G
        g_crossbar = Line(g_outer_circle.points[-1], g_outer_circle.points[-1] + 0.8 * RIGHT, color=blue)
        
        # This is a simplified representation. For a perfect logo, an SVG path is ideal.
        # Let's approximate it with combined shapes
        g_base = Circle(radius=1.5, color=blue, fill_opacity=1)
        g_cut = Circle(radius=1, color=BLACK, fill_opacity=1).move_to(g_base.get_center() + 0.3*UR)
        g_bar_extrude = Rectangle(width=1.5, height=0.6, color=blue, fill_opacity=1).next_to(g_base, RIGHT, buff=-1.7)
        g_bar_extrude.shift(0.3*UP + 0.1*LEFT) # Position it for the G bar
        
        # The red part of the G
        g_red_fill = Polygon(
            g_base.get_center() + 0.5 * RIGHT + 0.5 * DOWN,
            g_base.get_center() + 1.5 * RIGHT + 0.5 * DOWN,
            g_base.get_center() + 1.5 * RIGHT - 0.1 * UP,
            g_base.get_center() + 0.5 * RIGHT - 0.1 * UP,
            color=red, fill_opacity=1
        )
        g_red_fill.align_to(g_base, RIGHT).shift(0.2*RIGHT + 0.5 * DOWN)
        g_red_fill.stretch_to_fit_width(1.5)
        g_red_fill.stretch_to_fit_height(0.6)
        
        # Let's create the G character using more sophisticated shapes
        actual_g_shape = VGroup()
        outer_arc = Arc(radius=1.5, start_angle=(90+60)*DEGREES, end_angle=(90-300)*DEGREES, color=blue)
        inner_arc = Arc(radius=1, start_angle=(90+60)*DEGREES, end_angle=(90-300)*DEGREES, color=blue)
        
        # Connecting lines for the G form
        line_top = Line(outer_arc.points[0], inner_arc.points[0], color=blue)
        line_bottom = Line(outer_arc.points[-1], inner_arc.points[-1], color=blue)
        
        # This is becoming too complex for a simple example.
        # Back to the simplified `Text` objects with the correct colors for the full word.

        google_word = Text("Google", font_size=3.5, weight=BOLD)
        google_word.set_color_by_gradient(blue, red, yellow, green, blue, red) # Approximation: set by gradient
        
        # If we need specific colors per letter:
        g_color = blue
        o1_color = red
        o2_color = yellow
        g2_color = green
        l_color = blue
        e_color = red

        g_char = Text("G", font_size=3.5, color=g_color, weight=BOLD).shift(LEFT * 5)
        o1_char = Text("o", font_size=3.5, color=o1_color).next_to(g_char, RIGHT, buff=0.1)
        o2_char = Text("o", font_size=3.5, color=o2_color).next_to(o1_char, RIGHT, buff=0.1)
        g2_char = Text("g", font_size=3.5, color=g2_color).next_to(o2_char, RIGHT, buff=0.1)
        l_char = Text("l", font_size=3.5, color=l_color).next_to(g2_char, RIGHT, buff=0.1)
        e_char = Text("e", font_size=3.5, color=e_color).next_to(l_char, RIGHT, buff=0.1)

        logo_letters = VGroup(g_char, o1_char, o2_char, g2_char, l_char, e_char).move_to(ORIGIN)

        logo_letters.scale(1.2) # Scale up for better visibility

        self.play(Write(logo_letters), run_time=2)
        self.wait(1)
        # You could add animations, e.g., pulsating or individual letter movements
        # self.play(logo_letters[-1].animate.shift(0.5*UP), run_time=0.5)
        # self.play(logo_letters[-1].animate.shift(0.5*DOWN), run_time=0.5)
        self.wait(2)
