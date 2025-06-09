from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Define colors
        skin_color = "#E0B080"
        hair_color = BLACK
        eye_color = BLACK

        # Create face outline
        face = Ellipse(width=4, height=5, color=skin_color, fill_opacity=1)

        # Create hair
        hair_left = Arc(radius=2.5, start_angle=PI / 2, angle=-PI / 3, color=hair_color, stroke_width=6)
        hair_left.move_to(face.get_left() + UP * 0.8 + LEFT * 0.2)
        hair_right = Arc(radius=2.5, start_angle=PI / 2, angle=PI / 3, color=hair_color, stroke_width=6)
        hair_right.move_to(face.get_right() + UP * 0.8 + RIGHT * 0.2)
        hair_top = ArcBetweenPoints(face.get_top() + LEFT * 1.2, face.get_top() + RIGHT * 1.2, color=hair_color, stroke_width=6)
        hair_top.reverse_direction()

        # Create eyes
        eye_left = Circle(radius=0.3, color=eye_color, fill_opacity=1)
        eye_left.move_to(face.get_center() + UP * 1 + LEFT * 0.8)
        eye_right = Circle(radius=0.3, color=eye_color, fill_opacity=1)
        eye_right.move_to(face.get_center() + UP * 1 + RIGHT * 0.8)

        # Create nose
        nose = Polygon(
            face.get_center() + UP * 0.3,
            face.get_center() + DOWN * 0.2 + LEFT * 0.3,
            face.get_center() + DOWN * 0.2 + RIGHT * 0.3,
            color=BLACK,
            stroke_width=2
        )

        # Create mouth
        mouth = Arc(radius=0.7, start_angle=0, angle=PI, color=BLACK)
        mouth.move_to(face.get_center() + DOWN * 1)

        # Add features to scene
        self.play(Create(face))
        self.play(Create(hair_left), Create(hair_right), Create(hair_top))
        self.play(Create(eye_left), Create(eye_right))
        self.play(Create(nose))
        self.play(Create(mouth))

        self.wait(2)