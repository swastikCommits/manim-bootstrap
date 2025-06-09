from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Body
        body = Ellipse(width=3, height=5, color=BLUE_E, fill_opacity=1)
        self.play(Create(body))

        # Belly
        belly = Ellipse(width=2.5, height=3, color=WHITE, fill_opacity=1)
        belly.move_to(body.get_center())
        self.play(Create(belly))

        # Head
        head = Circle(radius=1, color=BLUE_E, fill_opacity=1)
        head.move_to(body.get_center() + UP * 2.5)
        self.play(Create(head))

        # Beak
        beak = Polygon([0,0,0], [0.5, 0.3, 0], [0.5, -0.3, 0], color=ORANGE, fill_opacity=1)
        beak.move_to(head.get_center() + RIGHT * 0.8)
        self.play(Create(beak))

        # Eyes
        left_eye = Circle(radius=0.2, color=BLACK, fill_opacity=1)
        left_eye.move_to(head.get_center() + LEFT * 0.3 + UP * 0.2)
        right_eye = Circle(radius=0.2, color=BLACK, fill_opacity=1)
        right_eye.move_to(head.get_center() + RIGHT * 0.3 + UP * 0.2)
        self.play(Create(left_eye), Create(right_eye))

        # Wings
        left_wing = RoundedRectangle(corner_radius=0.3, height=2, width=0.7, color=BLUE_E, fill_opacity=1)
        left_wing.move_to(body.get_center() + LEFT * 1.3 + DOWN * 0.5)
        right_wing = RoundedRectangle(corner_radius=0.3, height=2, width=0.7, color=BLUE_E, fill_opacity=1)
        right_wing.move_to(body.get_center() + RIGHT * 1.3 + DOWN * 0.5)
        self.play(Create(left_wing), Create(right_wing))

        # Feet
        left_foot = Polygon([0,0,0], [0.4, -0.4, 0], [-0.4, -0.4, 0], color=ORANGE, fill_opacity=1)
        left_foot.move_to(body.get_center() + LEFT * 0.6 + DOWN * 2.5)
        right_foot = Polygon([0,0,0], [0.4, -0.4, 0], [-0.4, -0.4, 0], color=ORANGE, fill_opacity=1)
        right_foot.move_to(body.get_center() + RIGHT * 0.6 + DOWN * 2.5)
        self.play(Create(left_foot), Create(right_foot))

        penguin = VGroup(body, belly, head, beak, left_eye, right_eye, left_wing, right_wing, left_foot, right_foot)
        self.wait(1)
        self.play(penguin.animate.shift(DOWN*1))
        self.wait(2)