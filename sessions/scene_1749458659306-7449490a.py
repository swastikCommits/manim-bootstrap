from manim import *

class GeneratedScene(Scene):
    def construct(self):
        # Title
        title = Text("Harkirat Singh", font_size=48)
        subtitle = Text("Software Engineer", font_size=36)
        title.move_to(UP)
        subtitle.next_to(title, DOWN)

        self.play(Write(title), Write(subtitle))
        self.wait(1)

        # Computer Screen
        screen = Rectangle(width=6, height=4, color=BLUE)
        screen.move_to(DOWN * 1.5)
        self.play(Create(screen))

        # Code Snippets
        code1 = Text("print('Hello World')", font_size=24, color=GREEN)
        code2 = Text("def my_function():", font_size=24, color=YELLOW)
        code3 = Text("  return True", font_size=24, color=YELLOW)

        code1.move_to(screen.get_center() + UP * 0.5)
        code2.move_to(screen.get_center())
        code3.move_to(screen.get_center() + DOWN * 0.5)

        self.play(Write(code1))
        self.wait(0.5)
        self.play(Write(code2))
        self.wait(0.5)
        self.play(Write(code3))
        self.wait(1)

        # Data Structure (Example: Linked List)
        node1 = Circle(radius=0.3, color=RED, fill_opacity=0.5)
        node2 = Circle(radius=0.3, color=RED, fill_opacity=0.5)
        node3 = Circle(radius=0.3, color=RED, fill_opacity=0.5)

        node1.move_to(LEFT * 3 + DOWN * 1.5)
        node2.move_to(DOWN * 1.5)
        node3.move_to(RIGHT * 3 + DOWN * 1.5)

        arrow1 = Arrow(node1.get_right(), node2.get_left())
        arrow2 = Arrow(node2.get_right(), node3.get_left())

        self.play(Create(node1), Create(node2), Create(node3))
        self.play(Create(arrow1), Create(arrow2))
        self.wait(1)

        # Highlighting code and structure
        self.play(
            Indicate(code1),
            Indicate(node1),
            Indicate(arrow1),
            Indicate(node2)
        )
        self.wait(1)

        self.play(FadeOut(title, subtitle, screen, code1, code2, code3, node1, node2, node3, arrow1, arrow2))

        # Closing Message
        closing_message = Text("Thanks for watching!", font_size=48)
        self.play(Write(closing_message))
        self.wait(2)