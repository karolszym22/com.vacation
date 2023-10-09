package com.vacation.com.vacation.MessageController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vacation.com.vacation.Model.Message;
import com.vacation.com.vacation.Service.MessageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class MessageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MessageService messageService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetCorrespondenceMessages() throws Exception {
        // Given
        int correspondenceId = 1;
        List<Message> correspondenceMessages = new ArrayList<>();
        correspondenceMessages.add(createMessage("Message 1 Title", "Message 1 Description"));
        correspondenceMessages.add(createMessage("Message 2 Title", "Message 2 Description"));

        // When
        when(messageService.getCorrespondenceMessages(correspondenceId)).thenReturn(correspondenceMessages);

        Map<String, Integer> requestBody = new HashMap<>();
        requestBody.put("correspondenceId", correspondenceId);

        // When
        ResultActions resultActions = mockMvc.perform(post("/coresspondenceMessages")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(requestBody)));

        // Then
        resultActions.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Message 1 Title"))
                .andExpect(jsonPath("$[0].description").value("Message 1 Description"))
                .andExpect(jsonPath("$[1].title").value("Message 2 Title"))
                .andExpect(jsonPath("$[1].description").value("Message 2 Description"));
    }

    private Message createMessage(String title, String description) {
        Message message = new Message();
        message.setTitle(title);
        message.setDescription(description);
        return message;
    }
}
